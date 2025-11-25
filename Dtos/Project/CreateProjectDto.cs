using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Project
{
    public class CreateProjectDto
    {
        [DefaultValue("Planned activities")]
        [Required(ErrorMessage = "Project name is required")]
        [MaxLength(100, ErrorMessage = "Project name cannot exceed 100 characters")]
        public string? Name { get; set; }
    }
}
