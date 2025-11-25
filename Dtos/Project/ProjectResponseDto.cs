using Zenith.Models.Enums;

namespace Zenith.Dtos.Project
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ProjectRole Role { get; set; }
    }
}
