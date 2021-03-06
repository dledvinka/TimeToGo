﻿using System;
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

        [HttpPost]
        public async Task<MonthlyRecordDto> Save([FromBody]MonthlyRecordDto dto)
        {
            var request = new SaveMonthlyRecordRequest() { Data = dto };
            await _mediator.Send(request);
            return await Task.FromResult(dto);
        }

        private MonthlyRecordDto Map(MonthlyRecord entity)
        {
            var dto = new MonthlyRecordDto()
            {
                Id = entity.Id,
                Year = entity.Year,
                Month = entity.Month,
                OvertimeFromPreviousMonth = TimeSpanToString(entity.OvertimeFromPreviousMonth),
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
                Arrived = entity.ArrivalTime?.ToString("HH:mm"),
                Day = entity.Day,
                DayOfWeek = entity.DayOfWeek,
                DeltaFromAccountingSystem = TimeSpanToString(entity.DeltaFromAccountingSystem),
                IsWorkingDay = entity.IsWorkingDay,
                Left = entity.LeaveTime?.ToString("HH:mm"),
                SpentOutside = TimeSpanToString(entity.SpentOutside)
            };

            return dto;
        }

        private string TimeSpanToString(TimeSpan? ts)
        {
            if (ts == null)
            {
                return string.Empty;
            }

            string result = ts.Value.TotalSeconds < 0 ? "-" : string.Empty;
            result += ts.Value.ToString(@"hh\:mm");

            return result;
        }
    }
}
