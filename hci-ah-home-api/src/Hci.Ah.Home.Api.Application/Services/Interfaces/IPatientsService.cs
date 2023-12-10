using Hci.Ah.Home.Api.Application.Models;

namespace Hci.Ah.Home.Api.Application.Services.Interfaces;

public interface IPatientsService
{
    public Task<ICollection<Patient>> SearchPatientsAsync(string? search = null);

    public Task<ExpandablePatient?> GetExpandablePatientAsync(Guid id);
}