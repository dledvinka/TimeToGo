using MediatR;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public class GetMonthlyRecordRequest : IRequest<MonthlyRecord>
    {
        public GetMonthlyRecordRequest()
        {
        }

        public int Year { get; internal set; }
        public int Month { get; internal set; }
    }
}