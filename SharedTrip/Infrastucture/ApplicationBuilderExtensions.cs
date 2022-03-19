using Microsoft.EntityFrameworkCore;
using SharedTrip.Data;
using SharedTrip.Data.Model;

namespace SharedTrip.Infrastucture
{
    public static class ApplicationBuilderExtensions
    {


        public static void PrepareDataBase(this IApplicationBuilder app)
        {
            //needed because out of scope of the sevices :@ 
            using var services = app.ApplicationServices.CreateScope();

            var db = services.ServiceProvider.GetService<SharedTripDbContext>();
            SeedTrips(db);
            db.Database.Migrate();
        }
        private static void SeedTrips(SharedTripDbContext data)
        {
            if (data.Trips.Any()) return;

            data.Trips.AddRange(new Trip[]
            {
                new Trip(){ Date = DateTime.UtcNow, Description = "Coolest trip ever! #1", FreeSeats = 4, PlaceForLuggage= true, Price=20.00M, StartPoint="Sofia", EndPoint="Varna", CarImageUrl = "https://media.wired.com/photos/61bbc2cbb540f6bc340c4429/3:2/w_1280%2Cc_limit/Gear-Mercedes-EQS-21C0123_001.jpg"},
                new Trip(){ Date = DateTime.UtcNow.AddDays(1), Description = "Coolest trip ever! #2", FreeSeats = 3, PlaceForLuggage= false, Price=25.00M, StartPoint="Veliko Tyrnovo", EndPoint="Ruse", CarImageUrl = "https://m.atcdn.co.uk/vms/media/%7Bresize%7D/c1dd9c955ceb49469ea8793ca43a4c3b.jpg"},
                new Trip(){ Date = DateTime.UtcNow.AddDays(2), Description = "Coolest trip ever! #3", FreeSeats = 5, PlaceForLuggage= true, Price=15.00M, StartPoint="Pleven", EndPoint="Burgas", CarImageUrl = "https://car-images.bauersecure.com/pagefiles/87858/bmwi4_50.jpg"},
                new Trip(){ Date = DateTime.UtcNow.AddDays(3), Description = "Coolest trip ever! #4", FreeSeats = 1, PlaceForLuggage= false, Price=0, StartPoint="Ruse", EndPoint="Varna", CarImageUrl = "https://cdn1.buyacar.co.uk/sites/buyacar/files/styles/w860/public/range-rover-evoque-1.jpg?itok=Ks7kn0hf"},
                new Trip(){ Date = DateTime.UtcNow.AddDays(5), Description = "Coolest trip ever! #5", FreeSeats = 2, PlaceForLuggage= true, Price=12.00M, StartPoint="Plovdiv", EndPoint="Yambol", CarImageUrl = "https://cut-images.roadster.com/listings_via_admin_manual/silverarrows/WDD2221772A258097/WDD2221772A258097_FrontSideView.jpeg"},
                new Trip(){ Date = DateTime.UtcNow.AddDays(15), Description = "Coolest trip ever! #6", FreeSeats = 0, PlaceForLuggage= false, Price=10.00M, StartPoint="Vidin", EndPoint="Sofia", CarImageUrl = "https://www.forbes.com/wheels/wp-content/uploads/2021/08/2022_Genesis_GV70_FD_SEO.jpg"}
            }) ;
            data.SaveChanges();
        }
    }
}
