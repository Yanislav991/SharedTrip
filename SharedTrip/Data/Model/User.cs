using Microsoft.AspNetCore.Identity;

namespace SharedTrip.Data.Model
{
    public class User : IdentityUser
    {
        public HashSet<Trip> TripsOrganized { get; set; } = new HashSet<Trip>();
        public HashSet<Trip> TripsParticipated { get; set; } = new HashSet<Trip>();
        public string AvatarUrl { get; internal set; }
    }
}
