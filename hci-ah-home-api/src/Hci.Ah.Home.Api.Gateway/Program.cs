using Hci.Ah.Home.Api.Application.Entities;
using Hci.Ah.Home.Api.Application.Repositories.Interfaces;
using Hci.Ah.Home.Api.Application.Services;
using Hci.Ah.Home.Api.Application.Services.Interfaces;
using Hci.Ah.Home.Api.Gateway.Config;
using Hci.Ah.Home.Api.Gateway.Middleware;
using Hci.Ah.Home.Api.Infrastructure;
using Hci.Ah.Home.Api.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
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

builder.Services.AddScoped<IPatientsRepository, PatientsRepository>();
builder.Services.AddScoped<IPatientsService, PatientsService>();

builder.Services.AddDbContext<HciDataContext>(options =>
    options.UseInMemoryDatabase("InMemoryDatabase")
        .ConfigureWarnings(w => w.Ignore(InMemoryEventId.TransactionIgnoredWarning)));


builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(options =>
    {
        options.AllowNullCollections = true;
        options.AllowNullDestinationValues = true;
    },
    typeof(Program).Assembly,
    typeof(IPatientsService).Assembly
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

using (var serviceScope = app.Services.CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<HciDataContext>();

    /*TODO in a real-world scenario
        dbContext.Database.Migrate();
     */

    dbContext.Hospitals.Add(new HospitalEntity
    {
        Id = new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"),
        Name = "Default hospital"
    });

    dbContext.Patients.Add(new PatientEntity
    {
        Id = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a"),
        FirstName = "Aliaksandr",
        LastName = "Huzen",
        Email = "huzen.av@gmail.com",
        PatientHospitals = new List<PatientHospitalRelation>
        {
            new()
            {
                PatientId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a"),
                HospitalId = new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"),
                VisitId = new Guid("a7a5182a-995c-4bce-bce0-6038be112b7b")
            }
        }
    });
    dbContext.Patients.Add(
        new PatientEntity
        {
            Id = new Guid("1ec2d3f7-8aa8-4bf5-91b8-045378919049"),
            FirstName = "Vinny",
            LastName = "Lawlor",
            Email = "vinny.lawlor@hci.care"
        });

    dbContext.Visits.Add(
        new VisitEntity
        {
            Id = new Guid("a7a5182a-995c-4bce-bce0-6038be112b7b"),
            Date = new DateTime(2023, 08, 22)
        });


    dbContext.SaveChanges();
}


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