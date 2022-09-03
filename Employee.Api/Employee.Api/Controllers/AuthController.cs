using Employee.Api.Dto;
using Employee.Api.Repository;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Employee.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;

        public AuthController(IAuthRepo authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForRegister userForlogin)
        {
            if (string.IsNullOrWhiteSpace(userForlogin.UserName) || string.IsNullOrWhiteSpace(userForlogin.Password))
            {
                return Unauthorized("you must write username and password");

            }
            var user = await _authRepo.Login(userForlogin.UserName, userForlogin.Password);
            if (user == null)
                return Unauthorized("Username or Password Not Correct");
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                };
            var token = _authRepo.GetToken(authClaims);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister)
        {
            var registerd = await _authRepo.Register(userForRegister.UserName, userForRegister.Password);
            if (registerd)
                return Ok();
            return BadRequest("user Exist");
        }


    }
}
