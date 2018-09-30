using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Models
{
  public class Subscription
  {
    [Key]
    public int? SubscriptionID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Activity { get; set; }
    public string Comments { get; set; }
  }
}