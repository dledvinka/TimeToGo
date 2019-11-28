using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TimeToGo.WebApp.Dtos;

namespace TimeToGo.WebApp.Features.Records
{
    public class SaveMonthlyRecordRequest : IRequest
    {
        public MonthlyRecordDto Data { get; internal set; }
    }
}
