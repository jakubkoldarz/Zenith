using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Models;

namespace Zenith.Dtos.Category
{
    public class UpdateCategoryDto
    {
        [DefaultValue("Updated shopping list")]
        [Required(ErrorMessage = "Category name is required")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters")]
        public string? Name { get; set; }
    }
}