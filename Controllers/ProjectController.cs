using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Zenith.Dtos.Project;
using Zenith.Extensions;
using Zenith.Services;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("api/projects")]
    [Authorize]
    public class ProjectController(ProjectService projectService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProjectsAsync()
        {
            var userId = User.GetUserId();
            var projects = await projectService.GetUserProjectsAsync(userId);
            return Ok(new { projects });
        }

        [HttpPost]
        public async Task<IActionResult> CreateProjectAsync([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.CreateProjectAsync(userId, createProjectDto);
            return StatusCode(StatusCodes.Status201Created, new { project.Id, project.Name, project.Role });
        }

        [HttpPatch("{projectId}")]
        public async Task<IActionResult> UpdateProjectAsync([FromRoute] int projectId, [FromBody] UpdateProjectDto updateProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.UpdateProjectAsync(projectId, userId, updateProjectDto);
            return Ok(new { project.Id, project.Name, project.Role });
        }

        [HttpPut("{projectId}/assign")]
        public async Task<IActionResult> AssignRoleToProject([FromRoute] int projectId, [FromBody] AssignRoleDto assignRoleDto)
        {
            var userId = User.GetUserId();
            await projectService.AssignRoleAsync(projectId, userId, assignRoleDto);
            return Ok();
        }

        [HttpPut("{projectId}/revoke")]
        public async Task<IActionResult> RevokeAccessToProject([FromRoute] int projectId, [FromBody] RevokeAccessDto revokeAccessDto)
        {
            var userId = User.GetUserId();
            await projectService.RevokeAccessAsync(projectId, userId, revokeAccessDto);
            return Ok();
        }
    }
}
