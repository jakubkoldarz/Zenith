using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Models;

namespace Zenith.Dtos.Category
{
    public class ReorderCategoryDto
    {
        [Required(ErrorMessage = "Category order is required")]
        public int Order { get; set; }
    }
}