using System.Linq.Expressions;
using Hci.Ah.Home.Api.Application.Entities;

namespace Hci.Ah.Home.Api.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
    public Task<PatientEntity?> FindByIdWithDetailsAsync(Guid id, bool trackChanges = true);

    public Task<ICollection<PatientEntity>> SearchPatientsAsync(
        Expression<Func<PatientEntity, bool>> constraint,
        bool trackChanges = true);
}