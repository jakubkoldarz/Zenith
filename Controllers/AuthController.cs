using Microsoft.AspNetCore.Mvc;
using Zenith.Dtos.Auth;
using Zenith.Services;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("api/auth")] 
    public class AuthController(AuthService authService) : ControllerBase 
    {

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto registerDto)
        {
            await authService.RegisterAsync(registerDto);
            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            var response = await authService.LoginAsync(loginDto);
            return Ok(response);
        }
    }
}