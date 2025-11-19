using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Zenith.Dtos.User;
using Zenith.Exceptions;
using Zenith.Extensions;
using Zenith.Services;

namespace Zenith.Controllers
{
    [Route("/api/user")]
    [ApiController]
    [Authorize]
    public class UserController(UserService userService) : Controller
    {
        private readonly UserService _userService = userService;

        [HttpGet("/me")]
        public async Task<IActionResult> GetMyProfileAsync()
        {
            var userId = User.GetUserId();

            var userDto = await _userService.GetSingleUserAsync(userId);

            return Ok(userDto);
        }

        [HttpGet("/")]
        public async Task<IActionResult> GetAllUsersAsync([FromQuery] string? search)
        {
            var users = await _userService.GetUsersAsync(search);
            return Ok(users);
        }
    }
}
