using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.Project;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Models;
using Zenith.Models.Enums;

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
        public async Task<ProjectResponseDto> UpdateProjectAsync(int projectId, int userId, UpdateProjectDto updateProjectDto)
        {
            var membership = await context.ValidateMembershipAsync(projectId, userId, ProjectRole.Owner);

            var project = membership.Project;
            project?.Name = updateProjectDto.Name;
            await context.SaveChangesAsync();

            return new ProjectResponseDto
            {
                Id = project!.Id,
                Name = project.Name,
                Role = membership.Role
            };
        }
        public async Task AssignRoleAsync(int projectId, int ownerUserId, AssignRoleDto assignRoleDto)
        {
            if (ownerUserId == assignRoleDto.UserId)
            {
                throw new BadRequestException("Owner cannot change their own role.");
            }

            await context.ValidateMembershipAsync(projectId, ownerUserId, ProjectRole.Owner);

            var roleName = Enum.Parse<ProjectRole>(assignRoleDto.Role!);

            if (roleName == ProjectRole.Owner)
            {
                throw new BadRequestException("Cannot assign Owner role to another user.");
            }

            var targetUserExists = context.Users.Any(u => u.Id == assignRoleDto.UserId);
            if(targetUserExists == false)
            {
                throw new BadRequestException("Target user does not exist.");
            }

            await context.Database.ExecuteSqlRawAsync(
                @"CALL ""AssignRoleToUser""({0}, {1}, {2});", 
                projectId, assignRoleDto.UserId, roleName.ToString()
            );
        }
        public async Task RevokeAccessAsync(int projectId, int ownerUserId, RevokeAccessDto revokeAccessDto)
        {
            await context.ValidateMembershipAsync(projectId, ownerUserId, ProjectRole.Owner);

            if (ownerUserId == revokeAccessDto.UserId)
            {
                throw new BadRequestException("Owner cannot revoke their own access.");
            }

            await context.Database.ExecuteSqlRawAsync(
                @"CALL ""RevokeAccess""({0}, {1});", 
                projectId, revokeAccessDto.UserId
            );
        }
        public async Task DeleteProjectAsync(int projectId, int userId)
        {
            await context.ValidateMembershipAsync(projectId, userId, ProjectRole.Owner);

            var projectToDelete = new Project { Id = projectId };
            context.Projects.Remove(projectToDelete);

            await context.SaveChangesAsync();
        }
    }
}
