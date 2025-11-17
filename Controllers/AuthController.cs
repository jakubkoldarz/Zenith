using Microsoft.AspNetCore.Mvc;

namespace Zenith.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult GetPing()
        {
            return Ok("auth - logowanie");
        }
    }
}
