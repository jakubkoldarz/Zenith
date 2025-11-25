using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Project
{
    public class RevokeAccessDto
    {
        [Required]
        public int UserId { get; set; }
    }
}
