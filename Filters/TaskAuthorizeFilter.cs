using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Zenith.Data;
using Zenith.Extensions;
using Zenith.Models.Enums;

namespace Zenith.Filters
{
    public class TaskAuthorizeFilter(DataContext dataContext, ProjectRole requiredRole, string routeParamName) : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userId = context.HttpContext.User.GetUserId();

            if(!context.RouteData.Values.TryGetValue(routeParamName, out var taskIdObj) ||
                !int.TryParse(taskIdObj?.ToString(), out int taskId))
            {
                context.Result = new BadRequestObjectResult("Invalid project ID");
                return;
            }

            var hasAccess = await dataContext.Tasks
                .AsNoTracking()
                .Where(t => t.Id == taskId)
                .Select(t => t.Category!.Project!.ProjectMemberships
                    .Any(pm => pm.UserId == userId && pm.Role >= requiredRole))
                .FirstOrDefaultAsync();

            if (hasAccess == false)
            {
                context.Result = new ForbidResult();
                return;
            }

            await next();
        }
    }
}
