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
        public async Task<IActionResult> GetCategoriesByProjectId([FromQuery] int projectId)
        {
            var userId = User.GetUserId();
            var categories = await categoryService.GetCategoriesAsync(projectId, userId);
            return Ok(new { categories });
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
        {
            var userId = User.GetUserId();
            var category = await categoryService.CreateCategoryAsync(userId, createCategoryDto);
            return Ok(new { category });
        }
    }
}
