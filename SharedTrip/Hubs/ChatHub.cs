using Microsoft.AspNetCore.SignalR;

namespace SharedTrip.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveOne", user, message);  
        }
    }
}
