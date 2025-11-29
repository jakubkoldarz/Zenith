using Microsoft.AspNetCore.Mvc;
using Zenith.Filters;
using Zenith.Models.Enums;

namespace Zenith.Attributes
{
    public class TaskAuthorizeAttribute : TypeFilterAttribute
    {
        public TaskAuthorizeAttribute(ProjectRole minRole = ProjectRole.Viewer, string routeParam = "id") 
            : base(typeof(TaskAuthorizeFilter))
        {
            Arguments = [minRole, routeParam];
        }
    }
}
