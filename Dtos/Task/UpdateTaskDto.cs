using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Task
{
    public class UpdateTaskDto
    {
        [DefaultValue("Buy groceries")]
        [Required(ErrorMessage = "Task title is required")]
        [MaxLength(100, ErrorMessage = "Task title cannot exceed 100 characters")]
        public string? Title { get; set; }

        [MaxLength(500, ErrorMessage = "Task description cannot exceed 100 characters")]
        public string? Description { get; set; }

    }
}
