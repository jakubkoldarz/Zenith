using System.Net;

namespace Zenith.Exceptions
{
    public class UnauthorizedException(string message) : AppException(message, HttpStatusCode.Unauthorized)
    {
    }
}
