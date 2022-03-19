using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SharedTrip.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        [Authorize]
        [Route("[controller]")]
        public IActionResult Get()
        {
            return Ok("Works");
        }
    }
}