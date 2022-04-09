using SharedTrip.Data;
using SharedTrip.Data.Model;
using SharedTrip.Models.Identity;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Services
{
    public class UserService : IUserService
    {
        private readonly SharedTripDbContext data;

        public UserService(SharedTripDbContext data)
        {
            this.data = data;
        }
        public async Task UpdateUserAsync(User user, UserEditModel userEditModel)
        {
            user.PhoneNumber = userEditModel.PhoneNumber;
            user.AvatarUrl = userEditModel.Image;
            user.Email = userEditModel.Email;
            await this.data.SaveChangesAsync();
        }
    }
}
