using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SharedTrip.Hubs;
using SharedTrip.Models.Chat;

namespace SharedTrip.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> hubContext;
        public ChatController(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }
        [Route("send")]                                       
        [HttpPost]
        public IActionResult SendRequest([FromBody] Message msg)
        {
            this.hubContext.Clients.All.SendAsync("ReceiveOne", msg.Username, msg.MessageText, msg.DateTime);
            return Ok();
        }
    }
}
