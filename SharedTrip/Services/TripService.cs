using SharedTrip.Data;
using SharedTrip.Models.Trips;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Services
{
    public class TripService : ITripsService
    {
        private readonly SharedTripDbContext data;

        public TripService(SharedTripDbContext data)
        {
            this.data = data;
        }
        public List<TripViewModel> GetTrips()
        {
            return this.data.Trips.Take(5).Select(x => new TripViewModel
            {
                Id = x.Id,
                CarImageUrl =x.CarImageUrl,
                Date = x.Date,
                Description = x.Description,
                EndPoint = x.EndPoint,
                FreeSeats = x.FreeSeats,
                PlaceForLuggage = x.PlaceForLuggage,
                Price= x.Price,
                StartPoint =x.StartPoint
            }).ToList();

        }
    }
}
