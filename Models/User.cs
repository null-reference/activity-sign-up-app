using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Models
{
  public class User
  {
    [Key]
    public int? UserID { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
  }
}