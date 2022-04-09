using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data.Model;
using SharedTrip.Models.Identity;
using SharedTrip.Services.Contracts;
using System.Net;
using System.Reflection;
using System.Text.Json;

namespace SharedTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITripsService tripsService;
        private readonly IUserService userService;
        public UserController(UserManager<User> userManager, ITripsService tripsService, IUserService userService)
        {
            this.userService = userService;
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
        [Route("edit")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Edit(UserEditModel userEditModel)
        {
            if (ModelState.IsValid)
            {
                // Do something with the product (not shown).
                var user = await this._userManager.FindByNameAsync(this.User.Identity.Name);
                await this.userService.UpdateUserAsync(user, userEditModel);

                return Ok(new Response() { Message = "Updated succesfully!", Status = "Ok"});
            }
            else
            {
                return BadRequest(ModelState);  
            }


        }
    }
}