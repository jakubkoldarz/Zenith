using Microsoft.AspNetCore.Mvc;

namespace ZenithApi.Controllers
{
    [ApiController] 
    [Route("api/ping")] 
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetPing()
        {
            return Ok("Pong");
        }
    }
}