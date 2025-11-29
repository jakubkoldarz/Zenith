using System.Net;

namespace Zenith.Exceptions
{
    public class ForbiddenException(string message = "You do not have permission to perform this action") : AppException(message, HttpStatusCode.Forbidden)
    {
    }
}
