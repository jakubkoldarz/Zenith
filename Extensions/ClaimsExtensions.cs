using System.Security.Claims;
using Zenith.Exceptions;

namespace Zenith.Extensions
{
    public static class ClaimsExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var idString = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(idString) || !int.TryParse(idString, out int userId))
            {
                throw new BadRequestException("Corrupted token. Invalid user data.");
            }

            return userId;
        }
    }
}