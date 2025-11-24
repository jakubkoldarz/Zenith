using System.Net;

namespace Zenith.Exceptions
{
    public class NotFoundException(string message) : AppException(message, HttpStatusCode.NotFound)
    {
    }
}
