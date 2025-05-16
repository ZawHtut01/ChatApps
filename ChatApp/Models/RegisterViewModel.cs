using System.ComponentModel.DataAnnotations;

namespace ChatApp.Models
{
    public class RegisterViewModel
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password"), DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        //public IFormFile? ProfileImage { get; set; }
    }

}
