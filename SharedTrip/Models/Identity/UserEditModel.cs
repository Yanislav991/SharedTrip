using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace SharedTrip.Models.Identity
{
    public class UserEditModel
    {
        [Email]
        public string Email { get; set; }
        [StringLength(10, MinimumLength = 10)]
        public string PhoneNumber { get; set; }
        [System.ComponentModel.DataAnnotations.Url]
        public string Image { get; set; }
    }
}
