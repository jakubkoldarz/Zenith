using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Models.Enums;

namespace Zenith.Dtos.Project
{
    public class AssignRoleDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [DefaultValue("Viewer")]
        [EnumDataType(typeof(ProjectRole), ErrorMessage = "Invalid project role.")]
        public string? Role { get; set; } 
    }
}