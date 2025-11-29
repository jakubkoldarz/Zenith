using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zenith.Dtos.Category;
using Zenith.Dtos.Task;
using Zenith.Extensions;
using Zenith.Services;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("api/categories")]
    [Authorize]
    public class TaskController(TaskService taskService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int categoryId)
        {
            var userId = User.GetUserId();
            var tasks = await taskService.GetTasksAsync(userId, categoryId);
            return Ok(new { tasks });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskDto createTaskDto)
        {
            var userId = User.GetUserId();
            var task = await taskService.CreateTaskAsync(userId, createTaskDto);
            return Ok(task);
        }

        [HttpPatch("/:id")]
        public async Task<IActionResult> Update([FromRoute(Name = "id")] int taskId, [FromBody] UpdateTaskDto updateTaskDto)
        {
            var userId = User.GetUserId();
            var task = await taskService.UpdateTaskAsync(userId, taskId, updateTaskDto);
            return Ok(task);
        }

        [HttpPatch("/:id/move")]
        public async Task<IActionResult> Move([FromRoute(Name = "id")] int taskId, [FromBody] MoveTaskDto moveTaskDto)
        {
            var userId = User.GetUserId();
            await taskService.MoveTaskAsync(userId, taskId, moveTaskDto);
            return NoContent();
        }
    }
}
