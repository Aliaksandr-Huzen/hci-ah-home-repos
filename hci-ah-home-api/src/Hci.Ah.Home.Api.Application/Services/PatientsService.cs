using System.Linq.Expressions;
using AutoMapper;
using Hci.Ah.Home.Api.Application.Entities;
using Hci.Ah.Home.Api.Application.Models;
using Hci.Ah.Home.Api.Application.Repositories.Interfaces;
using Hci.Ah.Home.Api.Application.Services.Interfaces;

namespace Hci.Ah.Home.Api.Application.Services;

public class PatientsService : IPatientsService
{
    private readonly IMapper _mapper;
    private readonly IPatientsRepository _repository;

    public PatientsService(IPatientsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ICollection<Patient>> SearchPatientsAsync(string? search = null)
    {
        Expression<Func<PatientEntity, bool>> constraint = p => true;

        if (!string.IsNullOrEmpty(search))
            constraint = p => p.Email.Contains(search) || p.FirstName.Contains(search) || p.LastName.Contains(search);

        var entities = await _repository.SearchPatientsAsync(constraint, false);

        var result = _mapper.Map<ICollection<Patient>>(entities);

        return result;
    }

    public async Task<ExpandablePatient?> GetExpandablePatientAsync(Guid id)
    {
        var entity = await _repository.FindByIdWithDetailsAsync(id);

        if (entity == null) return null;

        var patient = _mapper.Map<ExpandablePatient>(entity);

        if (entity.PatientHospitals?.Any() != true) return patient;
        
        patient.HospitalVisits = new List<HospitalVisit>();
            
        foreach (var ph in entity.PatientHospitals!)
            patient.HospitalVisits!.Add(new HospitalVisit
            {
                HospitalId = ph.Hospital.Id,
                HospitalName = ph.Hospital.Name,
                VisitDate = ph.Visit.Date
            });

        return patient;
    }
}