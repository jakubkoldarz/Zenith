using System.ComponentModel.DataAnnotations;

namespace Zenith.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }
    }
}
