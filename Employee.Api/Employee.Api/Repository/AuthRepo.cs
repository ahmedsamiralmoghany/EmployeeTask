using Data;
using Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Employee.Api.Repository
{
    public interface IAuthRepo
    {
        Task<User> Login(string username, string password);
        Task<bool> Register(string username, string password);
        JwtSecurityToken GetToken(List<Claim> authClaims);
    }
    public class AuthRepo : IAuthRepo
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<User> _hasher;

        public AuthRepo(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _hasher = new PasswordHasher<User>();
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.UserName == username);
            if (user == null)
                return null;
            var verfied = _hasher.VerifyHashedPassword(user, user.Password, password);
            if (verfied == PasswordVerificationResult.Success)
                return user;
            if (verfied == PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.Password = _hasher.HashPassword(user, password);
                await _context.SaveChangesAsync();
                return user;
            }
            return null;
        }

        public async Task<bool> Register(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.UserName == username);
            if (user != null)
                return false;
            else
            {
                user = new User { UserName = username, Password = password };
                user.Password = _hasher.HashPassword(user, password);
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
