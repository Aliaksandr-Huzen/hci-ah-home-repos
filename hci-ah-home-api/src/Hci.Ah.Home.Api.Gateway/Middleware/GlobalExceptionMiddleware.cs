using System.Net;

namespace Hci.Ah.Home.Api.Gateway.Middleware;

public class GlobalExceptionMiddleware : IMiddleware
{
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(ILogger<GlobalExceptionMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
            return;
        }
        catch (Exception ex)
        {
            _logger.LogError("An error occurred while processing request: {Ex}", ex);
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }

        await Task.Run(() => HandleExceptionAsync(context));
    }

    private static void HandleExceptionAsync(HttpContext context)
    {
        context.Response.ContentType = "application/json";
    }
}