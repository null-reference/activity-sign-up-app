using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activity_sign_up_app.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace activity_sign_up_app.Controllers
{
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly AcmeWebActivityContext _db;
    private readonly IConfiguration _configuration;

    public AuthController(AcmeWebActivityContext db, IConfiguration configuration)
    {
      _db = db;
      _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<AuthModel>> Login([FromBody]LoginModel user)
    {
      if (user == null)
        return BadRequest();

      // todo: password should be hashed/salted in the db; we're doing a plaintext comparison here -- CAN DO BETTER!

      // find the user with the same credentials
      var matchedUser = await _db.User
        .FirstOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password);
      if (matchedUser == null)
        return Unauthorized();

      // encode info into a jwt so we can get at it later without db/memory access
      var secretKeyString = _configuration.GetValue<string>("Auth:SecretKey");
      var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKeyString));
      var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

      var tokenOptions = new JwtSecurityToken(
        issuer: _configuration.GetValue<string>("Auth:ValidIssuer"),
        audience: _configuration.GetValue<string>("Auth:ValidAudience"),
        claims: new List<Claim>{
          // encode some user data into our token
          new Claim("UserID", matchedUser.UserID.ToString()),
          new Claim("Username", matchedUser.Username),
          new Claim("FirstName", matchedUser.FirstName),
          new Claim("LastName", matchedUser.LastName),
          new Claim("Email", matchedUser.Email),
        },
        expires: DateTime.Now.AddMinutes(_configuration.GetValue<int>("Auth:SessionLengthMinutes")),
        signingCredentials: signinCredentials
      );

      var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
      return Ok(new AuthModel { Token = tokenString });
    }

    [HttpGet]
    [Authorize]
    public ActionResult TestAuth()
    {
      return Ok();
    }

    [Serializable]
    public class LoginModel
    {
      public string Username { get; set; }
      public string Password { get; set; }
    }

    [Serializable]
    public class AuthModel
    {
      public string Token { get; set; }
    }
  }
}
