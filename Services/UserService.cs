using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Dtos.User;
using Zenith.Exceptions;
using Zenith.Extensions;

namespace Zenith.Services
{
    public class UserService(DataContext context)
    {
        public async Task<UserResponseDto> GetSingleUserAsync(int userId)
        {
            var user = await context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return user.ToDto();
        }
        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync(string? searchParam = null)
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

            var users = await query.Select(u => u.ToDto()).ToListAsync();

            return users;
        }
    }
}
