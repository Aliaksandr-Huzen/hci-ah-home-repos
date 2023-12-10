using System.Linq.Expressions;
using Hci.Ah.Home.Api.Application.Entities;
using Hci.Ah.Home.Api.Application.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hci.Ah.Home.Api.Infrastructure.Repositories;

public class PatientsRepository : IPatientsRepository
{
    private readonly HciDataContext _context;

    public PatientsRepository(HciDataContext context)
    {
        _context = context;
    }

    public Task<PatientEntity?> FindByIdWithDetailsAsync(Guid id, bool trackChanges = true)
    {
        IQueryable<PatientEntity> query = _context
            .Set<PatientEntity>()
            .Where(e => e.Id.Equals(id))
            .Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Hospital)
            .Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Visit);

        if (!trackChanges) query = query.AsNoTracking();

        return query.SingleOrDefaultAsync();
    }

    public async Task<ICollection<PatientEntity>> SearchPatientsAsync(
        Expression<Func<PatientEntity, bool>> constraint, bool trackChanges = false)
    {
        var query = _context.Set<PatientEntity>().Where(constraint);

        if (!trackChanges) query = query.AsNoTracking();

        return await query.ToArrayAsync();
    }
}