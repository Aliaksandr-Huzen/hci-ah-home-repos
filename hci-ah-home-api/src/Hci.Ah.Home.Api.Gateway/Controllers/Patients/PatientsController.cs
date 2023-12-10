using Hci.Ah.Home.Api.Application.Models;
using Hci.Ah.Home.Api.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/patients")]
[ApiExplorerSettings(GroupName = "Patients")]
[ApiController]
public class PatientsController : ControllerBase
{
    private readonly IPatientsService _patientsService;

    public PatientsController(IPatientsService patientsService)
    {
        _patientsService = patientsService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<Patient>))]
    public async Task<IActionResult> GetPatients([FromQuery] string? search)
    {
        var patients = await _patientsService.SearchPatientsAsync(search);

        return Ok(patients);
    }

    //TODO: CUD

    [HttpGet("{id:guid}/expandable")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExpandablePatient))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetExpandablePatient(Guid id)
    {
        var patient = await _patientsService.GetExpandablePatientAsync(id);

        if (patient == null) return NotFound();

        return Ok(patient);
    }
}