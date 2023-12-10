using Hci.Ah.Home.Api.Application.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hci.Ah.Home.Api.Infrastructure;

public interface IHciDataContext
{
    DbSet<PatientEntity> Patients { get; set; }

    DbSet<HospitalEntity> Hospitals { get; set; }

    DbSet<VisitEntity> Visits { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}