namespace Hci.Ah.Home.Api.Application.Models;

public class HospitalVisit
{
    public Guid HospitalId { get; set; }

    public string HospitalName { get; set; } = null!;

    public DateTime VisitDate { get; set; }
}