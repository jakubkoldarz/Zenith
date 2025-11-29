using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.Category;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Models;
using Zenith.Models.Enums;

namespace Zenith.Services
{
    public class CategoryService(DataContext context)
    {
        public async Task<IEnumerable<CategoryResponseDto>> GetCategoriesAsync(int projectId, int userId)
        {
            await context.ValidateMembershipAsync(projectId, userId);

            var categories = await context.Categories
                .Where(c => c.ProjectId == projectId)
                .OrderBy(c => c.Order)
                .Select(c => c.ToDto())
                .ToListAsync();

            return categories;
        }
        public async Task<CategoryResponseDto> CreateCategoryAsync(int userId, CreateCategoryDto createCategoryDto)
        {
            await context.ValidateMembershipAsync(createCategoryDto.ProjectId, userId);

            var categoriesCount = await context.Categories
                .Where(c => c.ProjectId == createCategoryDto.ProjectId)
                .CountAsync();

            var category = new Category
            {
                Name = createCategoryDto.Name,
                ProjectId = createCategoryDto.ProjectId,
                Order = categoriesCount
            };

            context.Categories.Add(category);
            await context.SaveChangesAsync();

            return category.ToDto();
        }
        public async Task<CategoryResponseDto> UpdateCategoryAsync(int userId, int categoryId, UpdateCategoryDto updateCategoryDto)
        {
            var category = await context.Categories.FindAsync(categoryId);

            if (category == null)
            {
                throw new NotFoundException("Category not found.");
            }

            await context.ValidateMembershipAsync(category.ProjectId, userId, ProjectRole.Editor);

            category.Name = updateCategoryDto.Name;

            await context.SaveChangesAsync();

            return category.ToDto();
        }
        public async Task ReorderCategoryAsync(int userId, int categoryId, ReorderCategoryDto reorderCategoryDto)
        {
            var category = await context.Categories.FindAsync(categoryId);

            if(category == null)
            {
                throw new NotFoundException("Category not found.");
            }
            
            await context.ValidateMembershipAsync(category.ProjectId, userId, ProjectRole.Editor);

            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var categoriesCount = await context.Categories
                    .Where(c => c.ProjectId == category.ProjectId)
                    .CountAsync();

                int newOrder = Math.Clamp(reorderCategoryDto.Order, 0, categoriesCount - 1);
                int oldOrder = category.Order;

                if (newOrder == oldOrder)
                {
                    await transaction.RollbackAsync();
                    return;
                }

                if (newOrder > oldOrder)
                {
                    // Przesunięcie w górę
                    await context.Categories
                        .Where(c => c.ProjectId == category.ProjectId &&
                                    c.Order > oldOrder &&
                                    c.Order <= newOrder)
                        .ExecuteUpdateAsync(c => c.SetProperty(cat => cat.Order, cat => cat.Order - 1));
                }
                else
                {
                    // Przesunięcie w dół
                    await context.Categories
                        .Where(c => c.ProjectId == category.ProjectId &&
                                    c.Order < oldOrder &&
                                    c.Order >= newOrder)
                        .ExecuteUpdateAsync(c => c.SetProperty(cat => cat.Order, cat => cat.Order + 1));
                }

                category.Order = newOrder;
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
            }
        }
    }
}
