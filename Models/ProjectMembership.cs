using System.ComponentModel.DataAnnotations;
using Zenith.Models.Enums;

namespace Zenith.Models
{
    public class ProjectMembership
    {
        [Required]
        public virtual User? User { get; set; }

        [Required]
        public virtual Project? Project { get; set; }

        [Required]
        public ProjectRole Role { get; set; }
    }
}
