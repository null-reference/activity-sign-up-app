using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using activity_sign_up_app.Data;
using activity_sign_up_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace activity_sign_up_app.Controllers
{
  [Route("api/[controller]")]
  public class UsersController : Controller
  {
    private readonly AcmeWebActivityContext _db;

    public UsersController(AcmeWebActivityContext db)
    {
      _db = db;
    }

    [HttpPost]
    public async Task<ActionResult<UserModel>> PostUser([FromBody]PostUserModel user)
    {
      // some super light validation
      if (string.IsNullOrEmpty(user?.Username))
        return BadRequest("Missing Username");
      if (string.IsNullOrEmpty(user?.Password))
        return BadRequest("Missing Password");
      if (string.IsNullOrEmpty(user?.FirstName))
        return BadRequest("Missing FirstName");
      if (string.IsNullOrEmpty(user?.LastName))
        return BadRequest("Missing LastName");
      if (string.IsNullOrEmpty(user?.Email))
        return BadRequest("Missing Email");

      // todo: password should be hashed/salted before storing

      var newUser = _db.User.Add(new User
      {
        Username = user.Username,
        Password = user.Password,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
      });

      await _db.SaveChangesAsync();

      return CreatedAtAction(nameof(GetUser),
        new { id = newUser.Entity.UserID },
        MapToModel(newUser.Entity));
    }

    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<ActionResult<UserModel>> GetUser(int id)
    {
      var item = await _db.User.FindAsync(id);
      if (item == null)
        return NotFound();
      return Ok(MapToModel(item));
    }

    [Serializable]
    public class UserModel
    {
      public int? UserID { get; set; }
      public string Username { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
    }

    [Serializable]
    public class PostUserModel : UserModel
    {
      public string Password { get; set; }
    }

    private UserModel MapToModel(User data)
    {
      return new UserModel
      {
        UserID = data.UserID,
        Username = data.Username,
        FirstName = data.FirstName,
        LastName = data.LastName,
        Email = data.Email,
      };
    }
  }
}
