using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Auth
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Firstname is required")]
        [MaxLength(100, ErrorMessage = "Firstname cannot exceed 100 characters")]
        public string? Firstname { get; set; }

        [MinLength(2, ErrorMessage = "Lastname must be at least 2 characters long")]
        [MaxLength(100, ErrorMessage = "Lastname cannot exceed 100 characters")]
        public string? Lastname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        [MaxLength(100, ErrorMessage = "Password cannot exceed 100 characters")]
        public string? Password { get; set; }
    }
}
