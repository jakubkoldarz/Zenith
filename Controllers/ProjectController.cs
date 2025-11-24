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
        private ProjectService _projectService { get; } = projectService;

        [HttpGet]
        public async Task<IActionResult> GetAllProjectsAsync()
        {
            var userId = User.GetUserId();
            var projects = await _projectService.GetUserProjectsAsync(userId);
            return Ok(new { projects });
        }

        [HttpPost]
        public async Task<IActionResult> CreateProjectAsync([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = User.GetUserId();
            var project = await _projectService.CreateProjectAsync(userId, createProjectDto);
            return StatusCode(StatusCodes.Status201Created, new { project.Id, project.Name, project.Role });
        }
    }
}
