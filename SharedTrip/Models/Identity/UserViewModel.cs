using SharedTrip.Models.Trips;

namespace SharedTrip.Models.Identity
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarUrl { get; set; }
        public IEnumerable<TripViewModel> Trips { get; set; }
    }
}
