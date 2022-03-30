using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data;
using SharedTrip.Models.Trips;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly ITripsService tripsService;
        private readonly SharedTripDbContext data;
        public TripController(ITripsService tripsService, SharedTripDbContext data)
        {
            this.tripsService = tripsService;
            this.data = data;
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
        public IActionResult Create(TripViewModel trip)
        {
            //return tripsService.GetTrips();
            return Content("");
        }

    }
}
