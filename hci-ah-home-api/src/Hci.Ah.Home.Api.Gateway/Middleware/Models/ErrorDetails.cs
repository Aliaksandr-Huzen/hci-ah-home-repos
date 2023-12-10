namespace Hci.Ah.Home.Api.Gateway.Middleware.Models;

public class ErrorDetails
{
    public int StatusCode { get; set; }

    public string? Message { get; set; }

    public string? OperationId { get; set; }
}