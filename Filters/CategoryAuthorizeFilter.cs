using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Extensions;
using Zenith.Models.Enums;
using Zenith.Exceptions;

namespace Zenith.Filters
{
    public class CategoryAuthorizeFilter(DataContext dataContext, ProjectRole requiredRole, string routeParamName) : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userId = context.HttpContext.User.GetUserId();

            if(!context.RouteData.Values.TryGetValue(routeParamName, out var categoryIdObj) ||
                !int.TryParse(categoryIdObj?.ToString(), out int categoryId))
            {
                throw new BadRequestException("Invalid category ID");
            }

            var hasAccess = await dataContext.Categories
                .AsNoTracking()
                .Where(c => c.Id == categoryId)
                .Select(c => c.Project!.ProjectMemberships
                    .Any(pm => pm.UserId == userId && pm.Role >= requiredRole))
                .FirstOrDefaultAsync();

            if (hasAccess == false)
            {
                throw new ForbiddenException();
            }

            await next();
        }
    }
}
