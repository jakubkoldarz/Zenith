using System.ComponentModel.DataAnnotations;

namespace Zenith.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Firstname { get; set; }

        [MaxLength(100)]
        public string? Lastname { get; set; }

        [Required]
        [MaxLength(100)]
        public string? PasswordHash { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string? Email { get; set; }

        public virtual ICollection<ProjectMembership> ProjectMemberships { get; set; } = new List<ProjectMembership>();
    }
}
