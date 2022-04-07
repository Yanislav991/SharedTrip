using SharedTrip.Data.Model;
using SharedTrip.Models.Trips;

namespace SharedTrip.Services.Contracts
{
    public interface ITripsService
    {
        public List<TripViewModel> GetTrips(string? userId);
        public Task CreateAsync(TripViewModel trip, User user);
        public TripViewModel FindById(int id);
        public Task<string> EditAsync (TripViewModel trip, string userName);
        public Task DeleteAsync(int id);
        public Trip FindTrip(int id);
    }
}
