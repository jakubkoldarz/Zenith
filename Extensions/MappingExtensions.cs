using Zenith.Dtos.Category;
using Zenith.Dtos.Project;
using Zenith.Dtos.Task;
using Zenith.Dtos.User;
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
        public static ProjectResponseDto ToDto(this ProjectMembership membership)
        {
            return new ProjectResponseDto
            {
                Id = membership.Project!.Id,
                Name = membership.Project.Name,
                Role = membership.Role
            };
        }
        public static UserResponseDto ToDto(this User user)
        {
            return new UserResponseDto
            {
                Email = user.Email,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Id = user.Id
            };
        }
    }
}
