using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Models;

namespace Zenith.Dtos.Category
{
    public class CreateCategoryDto
    {
        [DefaultValue("Shopping list")]
        [Required(ErrorMessage = "Category name is required")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Project ID is required")]
        public int ProjectId { get; set; }
    }
}