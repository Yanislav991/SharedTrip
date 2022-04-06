namespace SharedTrip.Models.Chat
{
    public class Message
    {
        public string Username { get; set; }
        public string MessageText { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
