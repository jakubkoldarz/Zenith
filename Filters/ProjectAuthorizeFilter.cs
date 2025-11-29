using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Extensions;
using Zenith.Exceptions;
using Zenith.Models.Enums;

namespace Zenith.Filters
{
    public class ProjectAuthorizeFilter(DataContext dataContext, ProjectRole requiredRole, string routeParamName) : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userId = context.HttpContext.User.GetUserId();
            object? projectIdObj = null;

            if(context.RouteData.Values.TryGetValue(routeParamName, out projectIdObj))
            {

            }
            else if(context.HttpContext.Request.Query.ContainsKey(routeParamName))
            {
                projectIdObj = context.HttpContext.Request.Query[routeParamName];
            }

            if (projectIdObj == null || !int.TryParse(projectIdObj.ToString(), out int projectId))
            {
                throw new BadRequestException("Invalid Project ID");
            } 

            var hasAccess = await dataContext.ProjectMemberships
                .AsNoTracking()
                .AnyAsync(pm => pm.ProjectId == projectId
                                && pm.UserId == userId
                                && pm.Role >= requiredRole);

            if (hasAccess == false)
            {
                throw new ForbiddenException();
            }

            await next();
        }
    }
}
