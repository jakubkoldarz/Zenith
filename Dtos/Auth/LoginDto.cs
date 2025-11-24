using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Auth
{
    public class LoginDto
    {
        [DefaultValue("joe.doe@example.com")]
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; } 

        [DefaultValue("P@ssw0rd!")]
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
