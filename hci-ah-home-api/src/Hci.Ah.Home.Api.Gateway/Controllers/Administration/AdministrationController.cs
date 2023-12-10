using Hci.Ah.Home.Api.Gateway.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Administration;

[Route("api/administration")]
[ApiExplorerSettings(GroupName = "Administration")]
[ApiController]
public class AdministrationController : ControllerBase
{
    private readonly AdministrationConfig _administrationConfig;

    public AdministrationController(IOptions<AdministrationConfig> options)
    {
        _administrationConfig = options.Value;
    }

    [HttpGet("version")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AdministrationVersion))]
    public Task<IActionResult> GetVersion()
    {
        var version = new AdministrationVersion
        {
            Version = _administrationConfig.Version
        };

        return Task.FromResult<IActionResult>(Ok(version));
    }
}