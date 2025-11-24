using System.Net;

namespace Zenith.Exceptions
{
    public class BadRequestException(string message) : AppException(message, HttpStatusCode.BadRequest)
    {
    }
}
