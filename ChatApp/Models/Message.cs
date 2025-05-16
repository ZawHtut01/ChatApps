namespace ChatApp.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }  // Navigation property
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
    }

}
