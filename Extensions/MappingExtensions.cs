using Zenith.Dtos.Category;
using Zenith.Dtos.Project;
using Zenith.Dtos.Task;
using Zenith.Models;

namespace Zenith.Extensions
{
    public static class MappingExtensions
    {
        public static TaskResponseDto ToDto(this TaskItem task)
        {
            return new TaskResponseDto
            {
                Id = task.Id,
                CategoryId = task.CategoryId,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                Order = task.Order,
                Title = task.Title,
            };
        }

        public static CategoryResponseDto ToDto(this Category category)
        {
            return new CategoryResponseDto
            {
                Id = category.Id,
                Order = category.Order,
                Name = category.Name,
                ProjectId = category.ProjectId
            };
        }

        public static ProjectResponseDto ToDto(this Project project)
        {
            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name
            };
        }
    }
}
