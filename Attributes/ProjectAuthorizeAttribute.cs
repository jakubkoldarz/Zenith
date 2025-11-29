using Microsoft.AspNetCore.Mvc;
using Zenith.Filters;
using Zenith.Models.Enums;

namespace Zenith.Attributes
{
    public class ProjectAuthorizeAttribute : TypeFilterAttribute
    {
        public ProjectAuthorizeAttribute(ProjectRole minRole = ProjectRole.Viewer, string routeParam = "id") 
            : base(typeof(ProjectAuthorizeFilter))
        {
            Arguments = [minRole, routeParam];
        }
    }
}
