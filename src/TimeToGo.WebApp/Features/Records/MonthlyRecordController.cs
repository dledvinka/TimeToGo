using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    [ApiController]
    [Route("[controller]")]

    public class MonthlyRecordController : ControllerBase
    {
        private readonly ILogger<MonthlyRecordController> _logger;
        private readonly IMediator _mediator;

        public MonthlyRecordController(ILogger<MonthlyRecordController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<MonthlyRecord> GetCurrent()
        {
            var request = new GetMonthlyRecordRequest() { Year = DateTime.Today.Year, Month = DateTime.Today.Month };
            var result = await _mediator.Send(request);
            return result;
        }
    }
}
