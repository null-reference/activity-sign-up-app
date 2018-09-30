using System.ComponentModel.DataAnnotations;
using activity_sign_up_app.Models;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Data
{
  public class SubscriptionContext : DbContext
  {
    public SubscriptionContext(DbContextOptions<SubscriptionContext> options)
      : base(options)
    {
    }

    public DbSet<Subscription> Subscription { get; set; }
  }
}