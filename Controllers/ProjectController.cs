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
        public async Task<IActionResult> GetAll()
        {
            var userId = User.GetUserId();
            var projects = await projectService.GetUserProjectsAsync(userId);
            return Ok(new { projects });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.CreateProjectAsync(userId, createProjectDto);
            return StatusCode(StatusCodes.Status201Created, new { project.Id, project.Name, project.Role });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update([FromRoute(Name = "id")] int projectId, [FromBody] UpdateProjectDto updateProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.UpdateProjectAsync(projectId, userId, updateProjectDto);
            return Ok(new { project.Id, project.Name, project.Role });
        }

        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignRole([FromRoute(Name = "id")] int projectId, [FromBody] AssignRoleDto assignRoleDto)
        {
            var userId = User.GetUserId();
            await projectService.AssignRoleAsync(projectId, userId, assignRoleDto);
            return Ok();
        }

        [HttpPut("{id}/revoke")]
        public async Task<IActionResult> RevokeAccess([FromRoute(Name = "id")] int projectId, [FromBody] RevokeAccessDto revokeAccessDto)
        {
            var userId = User.GetUserId();
            await projectService.RevokeAccessAsync(projectId, userId, revokeAccessDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int projectId)
        {
            var userId = User.GetUserId();
            await projectService.DeleteProjectAsync(projectId, userId);
            return Ok();
        }
    }
}
