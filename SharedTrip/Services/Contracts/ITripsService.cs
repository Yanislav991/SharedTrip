using SharedTrip.Models.Trips;

namespace SharedTrip.Services.Contracts
{
    public interface ITripsService
    {
        public List<TripViewModel> GetTrips();
    }
}
