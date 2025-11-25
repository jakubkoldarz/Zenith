using System.Net;
using System.Text.Json;
using Zenith.Dtos;
using Zenith.Exceptions;

namespace Zenith.Middleware
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionMiddleware> _logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                if(ex is AppException)
                {
                    _logger.LogWarning("Business Logic Error: {Message}", ex.Message);
                }
                else
                {
                    _logger.LogError(ex, "Critical System Error: {Message}", ex.Message);
                }
                await HandleExceptionAsync(context, ex);    
            }
        }

        public static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            HttpStatusCode status;
            string message;

            if(exception is AppException appException)
            {
                status = appException.StatusCode;
                message = appException.Message;
            }
            else
            {
                status = HttpStatusCode.InternalServerError;
                message = "Internal server error";
            }

            context.Response.StatusCode = (int)status;
            return context.Response.WriteAsync(JsonSerializer.Serialize(
                new ErrorResponse {
                    Status = (int)status,
                    Errors = new Dictionary<string, string[]>
                    {
                        { "error", new string[] { message } }
                    }
                }, options: new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower }
            ));
        }
    }
}
