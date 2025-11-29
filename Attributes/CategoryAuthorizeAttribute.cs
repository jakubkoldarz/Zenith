using Microsoft.AspNetCore.Mvc;
using Zenith.Filters;
using Zenith.Models.Enums;

namespace Zenith.Attributes
{
    public class CategoryAuthorizeAttribute : TypeFilterAttribute
    {
        public CategoryAuthorizeAttribute(ProjectRole minRole = ProjectRole.Viewer, string routeParam = "id") 
            : base(typeof(CategoryAuthorizeFilter))
        {
            Arguments = [minRole, routeParam];
        }
    }
}
