using Microsoft.AspNetCore.Mvc;

namespace ZenithApi.Controllers
{
    [ApiController] 
    [Route("[controller]")] 
    public class PingController : ControllerBase
    {
        // Obsługuje żądanie GET na /api/ping
        [HttpGet]
        public IActionResult GetPing()
        {
            // Zwraca prosty tekst "Pong" i status 200 OK
            return Ok("Pong");
        }
    }
}