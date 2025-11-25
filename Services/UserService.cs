using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.User;
using Zenith.Exceptions;

namespace Zenith.Services
{
    public class UserService(DataContext context)
    {
        public async Task<UserDto> GetSingleUserAsync(int userId)
        {
            var user = await context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return new UserDto
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email
            };
        }
        public async Task<IEnumerable<UserDto>> GetUsersAsync(string? searchParam = null)
        {
            var query = context.Users.AsNoTracking().AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParam) == false)
            {
                searchParam = searchParam.ToLower();
                query = query.Where(u =>
                    u.Firstname!.ToLower().Contains(searchParam) ||
                    u.Email!.ToLower().Contains(searchParam)
                ).Take(20);
            }

            var users = await query.Select(u => new UserDto
            {
                Id = u.Id,
                Firstname = u.Firstname,
                Lastname = u.Lastname,
                Email = u.Email
            }).ToListAsync();

            return users;
        }
    }
}
