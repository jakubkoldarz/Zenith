using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zenith.Dtos.Category;
using Zenith.Extensions;
using Zenith.Services;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("api/categories")]
    [Authorize]
    public class CategoryController(CategoryService categoryService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int projectId)
        {
            var userId = User.GetUserId();
            var categories = await categoryService.GetCategoriesAsync(projectId, userId);
            return Ok(new { categories });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto createCategoryDto)
        {
            var userId = User.GetUserId();
            var category = await categoryService.CreateCategoryAsync(userId, createCategoryDto);
            return Ok(new { category });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update([FromRoute(Name = "id")] int categoryId, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            var userId = User.GetUserId();
            var category = await categoryService.UpdateCategoryAsync(userId, categoryId, updateCategoryDto);
            return Ok(new { category });
        }

        [HttpPatch("{id}/reorder")]
        public async Task<IActionResult> Reorder([FromRoute(Name = "id")] int categoryId, [FromBody] ReorderCategoryDto reorderCategoryDto)
        {
            var userId = User.GetUserId();
            await categoryService.ReorderCategoryAsync(userId, categoryId, reorderCategoryDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int categoryId)
        {
            var userId = User.GetUserId();
            await categoryService.DeleteCategoryAsync(userId, categoryId);
            return NoContent();
        }
    }
}
