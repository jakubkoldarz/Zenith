using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zenith.Attributes;
using Zenith.Dtos.Project;
using Zenith.Extensions;
using Zenith.Services;
using Zenith.Models.Enums;

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
        
        [HttpGet("{id}")]
        [ProjectAuthorize(ProjectRole.Viewer)]
        public async Task<IActionResult> GetSingle([FromRoute(Name = "id")] int projectId)
        {
            var userId = User.GetUserId();
            var project = await projectService.GetProjectDetailsAsync(userId, projectId);
            return Ok(project);
        }
        

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.CreateProjectAsync(userId, createProjectDto);
            return StatusCode(StatusCodes.Status201Created, project);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update([FromRoute(Name = "id")] int projectId, [FromBody] UpdateProjectDto updateProjectDto)
        {
            var userId = User.GetUserId();
            var project = await projectService.UpdateProjectAsync(userId, projectId, updateProjectDto);
            return Ok(project);
        }

        [HttpPut("{id}/assign")]
        [ProjectAuthorize(ProjectRole.Owner)]
        public async Task<IActionResult> AssignRole([FromRoute(Name = "id")] int projectId, [FromBody] AssignRoleDto assignRoleDto)
        {
            var userId = User.GetUserId();
            await projectService.AssignRoleAsync(userId, projectId, assignRoleDto);
            return Ok();
        }

        [HttpPut("{id}/revoke")]
        [ProjectAuthorize(ProjectRole.Owner)]
        public async Task<IActionResult> RevokeAccess([FromRoute(Name = "id")] int projectId, [FromBody] RevokeAccessDto revokeAccessDto)
        {
            var userId = User.GetUserId();
            await projectService.RevokeAccessAsync(userId, projectId, revokeAccessDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        [ProjectAuthorize(ProjectRole.Owner)]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int projectId)
        {
            var userId = User.GetUserId();
            await projectService.DeleteProjectAsync(userId, projectId);
            return NoContent();
        }
    }
}
