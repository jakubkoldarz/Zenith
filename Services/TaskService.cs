using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.Task;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Models;
using Zenith.Models.Enums;

namespace Zenith.Services
{
    public class TaskService(DataContext context)
    {
        public async Task<IEnumerable<TaskResponseDto>> GetTasksAsync(int userId, int categoryId)
        {
            var category = await context.Categories.FindAsync(categoryId);

            if(category == null)
            {
                throw new NotFoundException("Category not found"); 
            }

            var tasks = await context.Tasks
                .AsNoTracking()
                .Where(t => t.CategoryId == categoryId)
                .Select(t => t.ToDto())
                .ToListAsync();

            return tasks;
        }
        public async Task<TaskResponseDto> CreateTaskAsync(int userId, CreateTaskDto createTaskDto)
        {
            var category = await context.Categories.FindAsync(createTaskDto.CategoryId);

            if(category == null)
            {
                throw new NotFoundException("Category not found");
            }

            await context.ValidateMembershipAsync(category.ProjectId, userId, ProjectRole.Editor);

            var newTaskIndex = await context.Tasks
                .Where(t => t.CategoryId == createTaskDto.CategoryId)
                .CountAsync();

            var task = new TaskItem
            {
                Category = category,
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                Order = newTaskIndex
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            return task.ToDto();
            
        }
        public async Task<TaskResponseDto> UpdateTaskAsync(int userId, int taskId, UpdateTaskDto updateTaskDto)
        {
            var task = await context.Tasks
                .Include(t => t.Category)
                .FirstOrDefaultAsync();

            if (task == null)
            {
                throw new NotFoundException("Task not found");
            }

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;

            await context.SaveChangesAsync();

            return task.ToDto();
        }
        public async Task MoveTaskAsync(int userId, int taskId, MoveTaskDto moveTaskDto)
        {
            var task = await context.Tasks
                .Where(t => t.Id == taskId)
                .Include(t => t.Category)
                .FirstOrDefaultAsync();

            if (task == null)
            {
                throw new NotFoundException("Task not found");
            }

            var oldCategoryId = task.CategoryId;
            var targetCategoryId = moveTaskDto.CategoryId ?? task.CategoryId;
            var changingCategory = oldCategoryId != targetCategoryId;

            // Sprawdzenie czy kategoria do której użytkownik próbuje
            // przenieść zadanie jest w tym samym projekcie 
            // co wcześniejsza kategoria
            if (changingCategory)
            {
                var targetCategoryExists = await context.Categories
                    .AnyAsync(c => c.Id == targetCategoryId && c.ProjectId == task.Category.ProjectId);

                if (targetCategoryExists == false)
                {
                    throw new NotFoundException("Target category not found");
                }
            }

            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var tasksCount = await context.Tasks
                    .Where(t => t.CategoryId == targetCategoryId)
                    .CountAsync();

                var oldOrder = task.Order;
                var maxOrder = changingCategory ? tasksCount : tasksCount - 1;
                var targetOrder = Math.Clamp(moveTaskDto.Order, 0, maxOrder);

                if (targetOrder == oldOrder && oldCategoryId == targetCategoryId)
                {
                    await transaction.RollbackAsync();
                    return;
                }

                if (changingCategory == false)
                {
                    if(targetOrder > oldOrder)
                    {
                        await context.Tasks
                            .Where(t => t.CategoryId == oldCategoryId
                                     && t.Order > oldOrder
                                     && t.Order <= targetOrder)
                            .ExecuteUpdateAsync(t => t.SetProperty(ti => ti.Order, ti => ti.Order - 1));
                    }
                    else
                    {
                        await context.Tasks
                            .Where(t => t.CategoryId == oldCategoryId
                                     && t.Order >= targetOrder
                                     && t.Order < oldOrder)
                            .ExecuteUpdateAsync(t => t.SetProperty(ti => ti.Order, ti => ti.Order + 1));
                    }
                }
                else
                {
                    await context.Tasks
                        .Where(t => t.CategoryId == targetCategoryId
                                 && t.Order >= targetOrder)
                        .ExecuteUpdateAsync(t => t.SetProperty(ti => ti.Order, ti => ti.Order + 1));

                    await context.Tasks
                        .Where(t => t.CategoryId == oldCategoryId
                                 && t.Order > oldOrder)
                        .ExecuteUpdateAsync(t => t.SetProperty(ti => ti.Order, ti => ti.Order - 1));
                    
                    task.CategoryId = targetCategoryId;
                }

                task.Order = targetOrder;

                await context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task DeleteTaskAsync(int userId, int taskId)
        {
            var taskToDelete = await context.Tasks
                .Include(t => t.Category)
                .Where(t => t.Id == taskId)
                .FirstOrDefaultAsync();
            
            if (taskToDelete == null)
            {
                throw new NotFoundException("Task not found");
            }

            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                await context.Tasks
                    .Where(t => t.CategoryId == taskToDelete.CategoryId
                             && t.Order > taskToDelete.Order)
                    .ExecuteUpdateAsync(t => t.SetProperty(ti => ti.Order, ti => ti.Order - 1));

                context.Tasks.Remove(taskToDelete);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
