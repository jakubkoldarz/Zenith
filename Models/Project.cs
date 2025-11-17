using System.ComponentModel.DataAnnotations;

namespace Zenith.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
        public virtual ICollection<ProjectMembership> ProjectMemberships { get; set; } = new List<ProjectMembership>();
    }
}
