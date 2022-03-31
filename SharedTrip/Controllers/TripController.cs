using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data;
using SharedTrip.Data.Model;
using SharedTrip.Models.Identity;
using SharedTrip.Models.Trips;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly ITripsService tripsService;
        private readonly UserManager<User> userManager;
        public TripController(ITripsService tripsService, UserManager<User> userManager)
        {
            this.tripsService = tripsService;
            this.userManager = userManager;
        }
        [HttpGet]
        [Route("all")]
        [Authorize]
        public List<TripViewModel> GetTrips()
        {
            return tripsService.GetTrips();
        }
        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> Create(TripViewModel trip)
        {
            var name = this.User.Identity.Name;
            var user = await this.userManager.FindByNameAsync(name);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Invalid Trip!" });
            }
            await this.tripsService.Create(trip, user);
            return Ok(new Response { Status = "Success", Message = "Trip created successfully!" });
        }
        [HttpGet("details/{id}")]
        public async Task<ActionResult<TripViewModel>> Details(int id)
        {
            var name = this.User.Identity.Name;
            var user = await this.userManager.FindByNameAsync(name);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });
            }
            var trip = this.tripsService.FindById(id);
            if (trip == null) return NotFound();
            return trip;
        }

    }
}
