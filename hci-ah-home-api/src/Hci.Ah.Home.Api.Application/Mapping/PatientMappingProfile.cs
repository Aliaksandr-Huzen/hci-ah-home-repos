using AutoMapper;
using Hci.Ah.Home.Api.Application.Entities;
using Hci.Ah.Home.Api.Application.Models;

namespace Hci.Ah.Home.Api.Application.Mapping;

public class PatientMappingProfile : Profile
{
    public PatientMappingProfile()
    {
        CreateMap<PatientEntity, Patient>().ReverseMap();
        CreateMap<PatientEntity, ExpandablePatient>().ReverseMap();
    }
}