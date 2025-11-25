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
    public class AuthService(DataContext context, JwtTokenService jwtTokenService)
    {
        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null)
            {
                throw new BadRequestException("User does not exist");
            }

            var isHashValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

            if (!isHashValid)
            {
                throw new BadRequestException("Invalid credentials");
            }

            string token = jwtTokenService.CreateToken(user);
            return new LoginResponseDto { Token = token };
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            var userExists = await context.Users.AnyAsync(u => u.Email == registerDto.Email);
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

            context.Users.Add(user);
            await context.SaveChangesAsync();
        }

        
    }
}

    
