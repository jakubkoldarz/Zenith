using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Exceptions;
using Zenith.Models;
using Zenith.Models.Enums;

namespace Zenith.Extensions
{
    public static class DataContextExtensions
    {
        public static async Task<ProjectMembership> ValidateMembershipAsync(
            this DataContext context, 
            int projectId, 
            int userId, 
            ProjectRole? requiredRole = null)
        {
            var membership = await context.ProjectMemberships
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

            if(membership == null)
            {
                throw new UnauthorizedException("User is not a member of the specified project.");
            }

            if(requiredRole.HasValue && membership.Role < requiredRole)
            {
                throw new UnauthorizedException("User does not have the required role to manage this project.");
            }

            return membership;
        }
    }
}
