using System.ComponentModel.DataAnnotations;

namespace ChatApp.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
        //public string? ProfileImagePath { get; set; }  // <-- Add this
        public DateTime CreatedAt { get; set; }
    }
}
