using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data.Model;
using SharedTrip.Models.Identity;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITripsService tripsService;
        public UserController(UserManager<User> userManager, ITripsService tripsService)
        {
            _userManager = userManager;
            this.tripsService = tripsService;
        }
        [Route("get")]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> GetUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var trips = tripsService.GetTrips(user.Id).Take(5);
            var userViewModel = new UserViewModel()
            {
                AvatarUrl = user.AvatarUrl,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Trips = trips,
                UserName = user.UserName
            };
            return userViewModel;
        }
    }
}
