namespace Hci.Ah.Home.Api.Application.Models;

public class ExpandablePatient : Patient
{
    public ICollection<HospitalVisit>? HospitalVisits { get; set; }
}