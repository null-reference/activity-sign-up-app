using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Models
{
  public class Subscription
  {
    [Key]
    public int? SubscriptionID { get; set; }
    public int UserID { get; set; }
    public string Activity { get; set; }
    public string Comments { get; set; }
  }
}