using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zenith.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }
        public int Order { get; set; }

        [Required]
        public virtual Project? Project { get; set; }

        public virtual ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
    }
}
