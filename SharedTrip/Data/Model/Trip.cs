using System.ComponentModel.DataAnnotations;

namespace SharedTrip.Data.Model
{
    public class Trip
    {
        public int Id { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3, ErrorMessage ="Length should be between 3 and 25!")]
        public string StartPoint { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3, ErrorMessage = "Length should be between 3 and 25!")]
        public string EndPoint { get; set; }
        public DateTime Date { get; set; }
        [Range(1, 8)]
        public int FreeSeats { get; set; }
        public bool PlaceForLuggage { get; set; }
        public decimal? Price { get; set; }
        [Url]
        public string? CarImageUrl { get; set; }
        [Required]
        [StringLength(300, MinimumLength =15, ErrorMessage ="Description is required! Length of the text should be between 15 and 300 characters!")]
        public string Description { get; set; }
        public string? UserId { get; set; }
        public User User { get; set; }
        public HashSet<User> Passengers { get; set; } = new HashSet<User>();

    }
}
