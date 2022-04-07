using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            return tripsService.GetTrips(null);
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> Create(TripViewModel trip)
        {
            var name = User.Identity.Name;
            var user = await userManager.FindByNameAsync(name);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Invalid Trip!" });
            }
            await tripsService.CreateAsync(trip, user);
            return Ok(new Response { Status = "Success", Message = "Trip created successfully!" });
        }
        [HttpGet("details/{id}")]
        [Authorize]
        public async Task<ActionResult<TripViewModel>> Details(int id)
        {
            var name = User.Identity.Name;
            var user = await userManager.FindByNameAsync(name);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });
            }
            var trip = tripsService.FindById(id);
            if (trip == null) return NotFound();
            return trip;
        }
        [HttpDelete("delete")]
        [Authorize]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            var name = User.Identity.Name;
            var user = await userManager.FindByNameAsync(name);
            var trip = tripsService.FindById(id);
            if (user == null || trip.UserName != user.UserName)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });
            }
            await tripsService.DeleteAsync(id);
            return Ok(new Response { Status = "Success", Message = "Trip deleted successfully!" });

        }
        [HttpPut]
        [Route("edit")]
        [Authorize]
        public async Task<IActionResult> Edit(TripViewModel trip)
        {

            var name = User.Identity.Name;
            var user = await userManager.FindByNameAsync(name);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Please login!" });
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Invalid Trip!" });
            }
            var response = await tripsService.EditAsync(trip, name);
            if (response == "invalidUser")
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error", Message = "Invalid User!" });

            }
            return Ok(new Response { Status = "Success", Message = "Trip created successfully!" });
        }
        [HttpGet("userId/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserId(int id)
        {
            var trip = tripsService.FindById(id);
            var name = User.Identity.Name;
            return Ok(new { isOwner = trip.UserName == name });
        }

    }
}
