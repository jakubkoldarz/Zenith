using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.Project;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Models;
using Zenith.Models.Enums;
using Zenith.Dtos.Category;

namespace Zenith.Services
{
    public class ProjectService(DataContext context)
    {
        public async Task<IEnumerable<ProjectResponseDto>> GetUserProjectsAsync(int userId)
        {
            var projects = await context.ProjectMemberships
                .AsNoTracking()
                .Where(pm => pm.UserId == userId)
                .OrderBy(pm => pm.Project!.Name)
                .Select(pm => new ProjectResponseDto
                {
                    Id = pm.Project!.Id,
                    Name = pm.Project.Name,
                    Role = pm.Role
                }).ToListAsync();

            return projects; 
        }
        public async Task<ProjectDetailsResponseDto> GetProjectDetailsAsync(int userId, int projectId)
        {
            var membership = await context.ProjectMemberships
                .AsNoTracking()
                .Where(pm => pm.UserId == userId && pm.ProjectId == projectId)
                .FirstOrDefaultAsync();

            if(membership == null)
            {
                throw new ForbiddenException();
            }

            var project = await context.Projects
                .AsNoTracking()
                .Where(p => p.Id == projectId)
                    .Include(p => p.Categories.OrderBy(p => p.Order))
                        .ThenInclude(c => c.TaskItems.OrderBy(p => p.Order))
                .FirstOrDefaultAsync();

            if (project == null)
            {
                throw new NotFoundException("Project not found");
            }

            return new ProjectDetailsResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Role = membership.Role,

                Categories = [.. project.Categories.Select(c => new CategoryDetailsResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Order = c.Order,
                    Tasks = [.. c.TaskItems.Select(t => t.ToDto())]
                })]
            };
        }
        public async Task<ProjectResponseDto> CreateProjectAsync(int userId, CreateProjectDto createProjectDto)
        {
            var project = new Project
            {
                Name = createProjectDto.Name
            };

            var membership = new ProjectMembership
            {
                Project = project,
                UserId = userId,
                Role = ProjectRole.Owner
            };

            context.ProjectMemberships.Add(membership);
            await context.SaveChangesAsync();

            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Role = membership.Role
            };
        }
        public async Task<ProjectResponseDto> UpdateProjectAsync(int userId, int projectId, UpdateProjectDto updateProjectDto)
        {
            await context.ValidateMembershipAsync(projectId, userId);

            var projectMembership = await context.ProjectMemberships
                .Where(pm => pm.ProjectId == projectId)
                .Include(pm => pm.Project)
                .FirstOrDefaultAsync();

            projectMembership.Project.Name = updateProjectDto.Name;
            await context.SaveChangesAsync();
            return projectMembership.ToDto();
        }
        public async Task AssignRoleAsync(int ownerUserId, int projectId, AssignRoleDto assignRoleDto)
        {
            if (ownerUserId == assignRoleDto.UserId)
            {
                throw new BadRequestException("Owner cannot change their own role");
            }

            //await context.ValidateMembershipAsync(projectId, ownerUserId, ProjectRole.Owner);

            var roleName = Enum.Parse<ProjectRole>(assignRoleDto.Role!);

            if (roleName == ProjectRole.Owner)
            {
                throw new BadRequestException("Cannot assign Owner role to another user");
            }

            var targetUserExists = context.Users.Any(u => u.Id == assignRoleDto.UserId);
            if(targetUserExists == false)
            {
                throw new BadRequestException("Target user does not exist");
            }

            await context.Database.ExecuteSqlRawAsync(
                @"CALL ""AssignRoleToUser""({0}, {1}, {2});", 
                projectId, assignRoleDto.UserId, roleName
            );
        }
        public async Task RevokeAccessAsync(int ownerUserId, int projectId, RevokeAccessDto revokeAccessDto)
        {
            if (ownerUserId == revokeAccessDto.UserId)
            {
                throw new BadRequestException("Owner cannot revoke their own access");
            }

            await context.Database.ExecuteSqlRawAsync(
                @"CALL ""RevokeAccess""({0}, {1});", 
                projectId, revokeAccessDto.UserId
            );
        }
        public async Task DeleteProjectAsync(int userId, int projectId)
        {
            var projectToDelete = new Project { Id = projectId };
            context.Projects.Remove(projectToDelete);

            await context.SaveChangesAsync();
        }
    }
}
