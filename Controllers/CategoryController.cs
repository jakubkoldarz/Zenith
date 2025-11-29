using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zenith.Attributes;
using Zenith.Dtos.Category;
using Zenith.Extensions;
using Zenith.Services;
using Zenith.Models.Enums;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("api/categories")]
    [Authorize]
    public class CategoryController(CategoryService categoryService) : ControllerBase
    {
        [HttpGet]
        [ProjectAuthorize(ProjectRole.Viewer, "projectId")]
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
            return Ok(category);
        }

        [HttpPatch("{id}")]
        [CategoryAuthorize(ProjectRole.Editor)]
        public async Task<IActionResult> Update([FromRoute(Name = "id")] int categoryId, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            var userId = User.GetUserId();
            var category = await categoryService.UpdateCategoryAsync(userId, categoryId, updateCategoryDto);
            return Ok(new { category });
        }

        [HttpPatch("{id}/reorder")]
        [CategoryAuthorize(ProjectRole.Editor)]
        public async Task<IActionResult> Reorder([FromRoute(Name = "id")] int categoryId, [FromBody] ReorderCategoryDto reorderCategoryDto)
        {
            var userId = User.GetUserId();
            await categoryService.ReorderCategoryAsync(userId, categoryId, reorderCategoryDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [CategoryAuthorize(ProjectRole.Editor)]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int categoryId)
        {
            var userId = User.GetUserId();
            await categoryService.DeleteCategoryAsync(userId, categoryId);
            return NoContent();
        }
    }
}
