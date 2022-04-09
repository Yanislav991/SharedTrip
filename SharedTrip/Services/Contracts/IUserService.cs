using SharedTrip.Data.Model;
using SharedTrip.Models.Identity;

namespace SharedTrip.Services.Contracts
{
    public interface IUserService
    {
        public Task UpdateUserAsync(User user, UserEditModel userEditModel);
    }
}
