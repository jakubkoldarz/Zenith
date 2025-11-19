using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Zenith.Data;
using Zenith.Dtos.Auth;
using Zenith.Exceptions;
using Zenith.Models;

namespace Zenith.Services
{
    public class AuthService(DataContext context, IConfiguration configuration)
    {
        private readonly DataContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null)
            {
                throw new BadRequestException("User does not exist");
            }

            var isHashValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

            if (!isHashValid)
            {
                throw new BadRequestException("Invalid credentials");
            }

            string token = GenerateJwtToken(user);
            return new LoginResponseDto { Token = token };
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Email == registerDto.Email);
            if(userExists)
            {
                throw new BadRequestException("Email is already taken");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password!);

            var user = new User
            {
                Firstname = registerDto.Firstname,
                Lastname = registerDto.Lastname,
                Email = registerDto.Email,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        private string GenerateJwtToken(User user)
        {
            if(user.Firstname == null || user.Email == null)
            {
                throw new BadRequestException("User data is incomplete");
            }

            var jwtKey = _configuration["Jwt:Key"]!;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Firstname),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

    
