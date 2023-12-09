using Hci.Ah.Home.Api.Gateway.Config;
using Hci.Ah.Home.Api.Gateway.Middleware;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AdministrationConfig>(builder.Configuration.GetSection("AdministrationConfig"));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .WithOrigins(builder.Configuration.GetSection("AllowedHosts").Get<string>()!)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddTransient<GlobalExceptionMiddleware>();

builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(options =>
    {
        options.AllowNullCollections = true;
        options.AllowNullDestinationValues = true;
    },
    typeof(Program).Assembly
);

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "HCI Home Api"
    });
    
    options.TagActionsBy(api =>
    {
        if (api.GroupName != null) return new[] { api.GroupName };

        if (api.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor)
            return new[] { controllerActionDescriptor.ControllerName };

        throw new InvalidOperationException("Unable to determine tag for endpoint.");
    });
    
    options.DocInclusionPredicate((_, _) => true);
    
    /*TODO
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"."
    });
   */
});

builder.Services.AddHealthChecks();

/*TODO

builder.Services.AddApplicationInsightsTelemetry();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
    
builder.Services.AddFluentValidation();

builder.Services.AddFluentValidationRulesToSwagger();

*/

var app = builder.Build();

app.UseSwagger(); 
app.UseSwaggerUI();

app.MapHealthChecks("healthz");

app.UseRewriter(new RewriteOptions()
    .AddRedirect("^$", "healthz"));

app.UseCors();

app.UseResponseCompression();

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.MapControllers();

app.Run();