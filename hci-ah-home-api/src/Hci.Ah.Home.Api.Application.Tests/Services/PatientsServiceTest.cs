using System.Linq.Expressions;
using AutoMapper;
using Hci.Ah.Home.Api.Application.Entities;
using Hci.Ah.Home.Api.Application.Mapping;
using Hci.Ah.Home.Api.Application.Repositories.Interfaces;
using Hci.Ah.Home.Api.Application.Services;
using Moq;
using Xunit;

namespace Hci.Ah.Home.Api.Application.Tests.Services;

public class PatientsServiceTest
{
    private readonly IMapper _mapper;

    public PatientsServiceTest()
    {
        var configuration = new MapperConfiguration(cfg => { cfg.AddProfile(new PatientMappingProfile()); });

        _mapper = configuration.CreateMapper();
    }


    [Fact]
    public async Task SearchAllPatients()
    {
        var patientEntities = new[]
        {
            new PatientEntity
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@example.com"
            }
        };

        Mock<IPatientsRepository> patientsRepository = new();

        patientsRepository.Setup(x =>
                x.SearchPatientsAsync(It.IsAny<Expression<Func<PatientEntity, bool>>>(), It.IsAny<bool>()))
            .ReturnsAsync(patientEntities);

        var patientsService = new PatientsService(patientsRepository.Object, _mapper);

        var result = await patientsService.SearchPatientsAsync();

        Assert.NotEmpty(result);
    }
}