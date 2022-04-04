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
        public async Task CreateAsync(TripViewModel trip, User user)
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
            var trip = FindTrip(id);
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

        public async Task<string> EditAsync(TripViewModel trip, string userName)
        {
            var currTrip = FindTrip(trip.Id);
            if(currTrip.User.UserName != userName)
            {
                return "invalidUser";
            }
            currTrip.CarImageUrl = trip.CarImageUrl;
            currTrip.Date = trip.Date;
            currTrip.Price = trip.Price;
            currTrip.Description = trip.Description;
            currTrip.EndPoint= trip.EndPoint;
            currTrip.StartPoint=trip.StartPoint;
            currTrip.Date= trip.Date;
            currTrip.FreeSeats=trip.FreeSeats;
            currTrip.PlaceForLuggage = trip.PlaceForLuggage;
            await this.data.SaveChangesAsync();
            return "validUser";

        }
        private Trip FindTrip(int id)
        {
            return data.Trips.FirstOrDefault(x => x.Id == id);
        }

        public async Task DeleteAsync(int id)
        {
            var trip = this.data.Trips.FirstOrDefault(x => x.Id == id);
            this.data.Trips.Remove(trip);
            await this.data.SaveChangesAsync();
        }
    }
}
