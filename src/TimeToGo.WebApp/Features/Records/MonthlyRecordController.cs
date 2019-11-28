using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeToGo.WebApp.Dtos;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    [ApiController]
    [Route("[controller]")]

    public class MonthlyRecordController : ControllerBase
    {
        private readonly ILogger<MonthlyRecordController> _logger;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public MonthlyRecordController(ILogger<MonthlyRecordController> logger, IMediator mediator, IMapper mapper)
        {
            _logger = logger;
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<MonthlyRecordDto> GetCurrent()
        {
            var request = new GetMonthlyRecordRequest() { Year = DateTime.Today.Year, Month = DateTime.Today.Month };
            var result = await _mediator.Send(request);
            var asDto = Map(result);
            return asDto;
        }

        private MonthlyRecordDto Map(MonthlyRecord entity)
        {
            var dto = new MonthlyRecordDto()
            {
                Id = entity.Id,
                Year = entity.Year,
                Month = entity.Month,
                MonthlyDeltaInMinutes = entity.MonthlyDelta.TotalMinutes,
                OvertimeFromPreviousMonthInMinutes = entity.OvertimeFromPreviousMonth.TotalMinutes,
                User = Map(entity.User),
                DailyRecords = entity.DailyRecords.Select(dr => Map(dr)).ToList()
            };

            return dto;
        }

        private UserDto Map(User entity)
        {
            var dto = new UserDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                DailyWorkingHoursInMinutes = entity.DailyWorkingHours.TotalMinutes
            };

            return dto;
        }

        private DailyRecordDto Map(DailyRecord entity)
        {
            var dto = new DailyRecordDto()
            {
                Id = entity.Id,
                ArrivalTime = entity.ArrivalTime,
                DailyDeltaInMinutes = entity.DailyDelta.TotalMinutes,
                Day = entity.Day,
                DeltaFromAccountingSystemInMinutes = entity.DeltaFromAccountingSystem?.TotalMinutes,
                IsWorkingDay = entity.IsWorkingDay,
                LeaveTime = entity.LeaveTime,
                SpentOutsideInMinutes = entity.SpentOutside?.TotalMinutes
            };

            return dto;
        }
    }
}
