using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Zenith.Dtos.User;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Services;

namespace Zenith.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UserController(UserService userService) : ControllerBase
    {
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.GetUserId();
            var user = await userService.GetSingleUserAsync(userId);
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search)
        {
            var users = await userService.GetUsersAsync(search);
            return Ok(users);
        }
    }
}
