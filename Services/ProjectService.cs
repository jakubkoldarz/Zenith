using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.Project;
using Zenith.Models;
using Zenith.Models.Enums;

namespace Zenith.Services
{
    public class ProjectService(DataContext context)
    {
        private readonly DataContext _context = context;

        public async Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId)
        {
            var projects = await _context.ProjectMemberships
                .AsNoTracking()
                .Where(pm => pm.UserId == userId)
                .Select(pm => new ProjectDto
                {
                    Id = pm.Project.Id,
                    Name = pm.Project.Name,
                    Role = pm.Role.ToString()
                }).ToListAsync();

            return projects; 
        }

        public async Task<ProjectDto> CreateProjectAsync(int userId, CreateProjectDto createProjectDto)
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

            _context.ProjectMemberships.Add(membership);
            await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Role = membership.Role.ToString()
            };
        }
    }
}
