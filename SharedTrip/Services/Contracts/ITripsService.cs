using SharedTrip.Data.Model;
using SharedTrip.Models.Trips;

namespace SharedTrip.Services.Contracts
{
    public interface ITripsService
    {
        public List<TripViewModel> GetTrips();
        public Task Create(TripViewModel trip, User user);
        public TripViewModel FindById(int id);
    }
}
