using SharedTrip.Data;
using SharedTrip.Data.Model;
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
            return this.data.Trips.Select(x => new TripViewModel
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
        public async Task Create(TripViewModel trip, User user)
        {
            var validTrip = new Trip()
            {
                User = user,
                UserId = user.Id,   
                CarImageUrl = trip.CarImageUrl,
                Date = trip.Date,
                Description = trip.Description,
                EndPoint = trip.EndPoint,
                FreeSeats = trip.FreeSeats,
                PlaceForLuggage = trip.PlaceForLuggage,
                Price = trip.Price,
                StartPoint = trip.StartPoint,

            };
            await data.Trips.AddAsync(validTrip);
            await data.SaveChangesAsync();
        }

        public TripViewModel FindById(int id)
        {
            var trip =  data.Trips.FirstOrDefault(x=>x.Id == id);
            var userName = "Unknown";
            var user = this.data.Users.FirstOrDefault(x => x.Id == trip.UserId);
            if(user != null)
            {
                userName = user.UserName;
            }
            return new TripViewModel()
            {
                Id = trip.Id,
                CarImageUrl = trip.CarImageUrl,
                Date = trip.Date,
                Description = trip.Description,
                EndPoint = trip.EndPoint,
                FreeSeats = trip.FreeSeats,
                PlaceForLuggage = trip.PlaceForLuggage,
                Price = trip.Price,
                StartPoint = trip.StartPoint,
                UserName = userName
            };
        }
    }
}
