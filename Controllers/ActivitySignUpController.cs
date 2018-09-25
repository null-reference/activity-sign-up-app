using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activity_sign_up_app.Models;
using Microsoft.AspNetCore.Mvc;

namespace activity_sign_up_app.Controllers
{
  [Route("api/[controller]")]
  public class ActivitySignUpController : Controller
  {
    private readonly SubscriptionContext _db;

    public ActivitySignUpController(SubscriptionContext db)
    {
      _db = db;
    }

    [HttpPost("subscriptions")]
    public ActionResult CreateSubscription([FromBody]SubscriptionModel subscription)
    {
      // some super light validation
      if (string.IsNullOrEmpty(subscription?.FirstName))
        return BadRequest("Missing FirstName");
      if (string.IsNullOrEmpty(subscription?.LastName))
        return BadRequest("Missing LastName");
      if (string.IsNullOrEmpty(subscription?.Email))
        return BadRequest("Missing Email");
      if (string.IsNullOrEmpty(subscription?.Activity))
        return BadRequest("Missing Activity");

      var newSubscription = _db.Subscription.Add(new Subscription
      {
        FirstName = subscription.FirstName,
        LastName = subscription.LastName,
        Email = subscription.Email,
        Activity = subscription.Activity,
        Comments = subscription.Comments,
      });

      _db.SaveChanges();

      return CreatedAtAction(nameof(GetSubscription),
        new { id = newSubscription.Entity.SubscriptionID },
        MapToModel(newSubscription.Entity));
    }

    [HttpGet("subscriptions/{id:int}")]
    public ActionResult GetSubscription(int id)
    {
      var item = _db.Subscription.FirstOrDefault(x => x.SubscriptionID == id);
      return Ok(MapToModel(item));
    }

    [HttpGet("subscriptions")]
    public ActionResult GetSubscriptions()
    {
      var items = _db.Subscription
        .Select(MapToModel)
        .ToList();

      return Ok(items);
    }

    [Serializable]
    public class SubscriptionModel
    {
      public int? SubscriptionID { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
      public string Activity { get; set; }
      public string Comments { get; set; }
    }

    private SubscriptionModel MapToModel(Subscription data)
    {
      return new SubscriptionModel
      {
        SubscriptionID = data.SubscriptionID,
        FirstName = data.FirstName,
        LastName = data.LastName,
        Email = data.Email,
        Activity = data.Activity,
        Comments = data.Comments,
      };
    }
  }
}
