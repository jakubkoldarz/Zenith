using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Dtos.Category;
using Zenith.Models.Enums;

namespace Zenith.Dtos.Project
{
    public class ProjectDetailsResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ProjectRole Role { get; set; }
        public IEnumerable<CategoryDetailsResponseDto> Categories { get; set; } = [];
    }
}
