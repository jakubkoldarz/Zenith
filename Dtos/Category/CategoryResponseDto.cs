using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Zenith.Models;

namespace Zenith.Dtos.Category
{
    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ProjectId { get; set; }
    }
}