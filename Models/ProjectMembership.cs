using System.ComponentModel.DataAnnotations;
using Zenith.Models.Enums;

namespace Zenith.Models
{
    public class ProjectMembership
    {
        public int UserId { get; set; }
        public virtual User? User { get; set; }

        public int ProjectId { get; set; }
        public virtual Project? Project { get; set; }

        [Required]
        public ProjectRole Role { get; set; }
    }
}
