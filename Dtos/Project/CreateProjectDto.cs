using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Project
{
    public class CreateProjectDto
    {
        [DefaultValue("Planned activities")]
        [Required]
        [MaxLength(100, ErrorMessage = "Project's name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;
    }
}
