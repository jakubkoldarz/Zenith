using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Project
{
    public class UpdateProjectDto
    {
        [DefaultValue("Modified Project's Name")]
        [Required(ErrorMessage = "Project name is required")]
        [MaxLength(100, ErrorMessage = "Project's name cannot exceed 100 characters")]
        public string? Name { get; set; }
    }
}
