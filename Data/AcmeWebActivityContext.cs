using System.ComponentModel.DataAnnotations;
using activity_sign_up_app.Models;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Data
{
  public class AcmeWebActivityContext : DbContext
  {
    public AcmeWebActivityContext(DbContextOptions<AcmeWebActivityContext> options)
      : base(options)
    {
    }

    public DbSet<User> User { get; set; }
    public DbSet<Subscription> Subscription { get; set; }
  }
}