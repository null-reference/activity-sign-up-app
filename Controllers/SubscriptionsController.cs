using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activity_sign_up_app.Data;
using activity_sign_up_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  public class SubscriptionsController : Controller
  {
    private readonly AcmeWebActivityContext _db;

    public SubscriptionsController(AcmeWebActivityContext db)
    {
      _db = db;
    }

    [HttpPost]
    public async Task<ActionResult<GetSubscriptionModel>> PostSubscription([FromBody]PostSubscriptionModel subscription)
    {
      // some super light validation
      if (string.IsNullOrEmpty(subscription?.Activity))
        return BadRequest("Missing Activity");

      // we can extract the user id from the user identity associated with our auth mechanism
      var userID = int.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID").Value);
      var newSubscription = _db.Subscription.Add(new Subscription
      {
        UserID = userID,
        Activity = subscription.Activity,
        Comments = subscription.Comments,
      });

      await _db.SaveChangesAsync();
      var user = await _db.User.FindAsync(userID);

      return CreatedAtAction(nameof(GetSubscription),
        new { id = newSubscription.Entity.SubscriptionID },
        MapToModel(newSubscription.Entity, user));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<GetSubscriptionModel>> GetSubscription(int id)
    {
      var item = await _db.Subscription.FindAsync(id);
      if (item == null) {
        return NotFound();
      }
      var user = await _db.User.FindAsync(item.UserID);
      return Ok(MapToModel(item, user));
    }

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<GetSubscriptionModel>>> GetSubscriptions()
    {
      var items = await (from s in _db.Subscription
        join u in _db.User on s.UserID equals u.UserID.Value
        select MapToModel(s, u)).ToListAsync();
      return Ok(items);
    }

    [Serializable]
    public class PostSubscriptionModel
    {
      public string Activity { get; set; }
      public string Comments { get; set; }
    }

    [Serializable]
    public class GetSubscriptionModel
    {
      public int? SubscriptionID { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
      public string Activity { get; set; }
      public string Comments { get; set; }
    }

    private GetSubscriptionModel MapToModel(Subscription subscription, User user)
    {
      return new GetSubscriptionModel
      {
        SubscriptionID = subscription.SubscriptionID,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        Activity = subscription.Activity,
        Comments = subscription.Comments,
      };
    }
  }
}
