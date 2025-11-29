using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Dtos.Task;
using Zenith.Models;

namespace Zenith.Dtos.Category
{
    public class CategoryDetailsResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ProjectId { get; set; }
        public int Order { get; set; }
        public IEnumerable<TaskResponseDto> Tasks { get; set; } = [];
    }
}