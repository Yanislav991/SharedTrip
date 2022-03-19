namespace SharedTrip.Models.Trips
{
    public class TripViewModel
    {
        public int Id { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime Date { get; set; }
        public int FreeSeats { get; set; }
        public bool PlaceForLuggage { get; set; }
        public decimal? Price { get; set; }
        public string? CarImageUrl { get; set; }
        public string Description { get; set; }
        public string? UserName { get; set; }
    }
}
