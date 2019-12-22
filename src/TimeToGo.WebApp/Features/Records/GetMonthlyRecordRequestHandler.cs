using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeToGo.WebApp.Data;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public class GetMonthlyRecordRequestHandler : IRequestHandler<GetMonthlyRecordRequest, MonthlyRecord>
    {
        private readonly TimeToGoContext _dbContext;

        public GetMonthlyRecordRequestHandler(TimeToGoContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public Task<MonthlyRecord> Handle(GetMonthlyRecordRequest request, CancellationToken cancellationToken)
        {
            var user = _dbContext.Users.First();

            var monthly = _dbContext.MonthlyRecords
                .Include(mr => mr.DailyRecords)
                .Include(mr => mr.User)
                .AsNoTracking()
                .FirstOrDefault(mr => mr.Year == request.Year && mr.Month == request.Month);

            if (monthly == null)
            {
                monthly = new MonthlyRecord()
                {
                    Year = request.Year,
                    Month = request.Month,
                    OvertimeFromPreviousMonth = TimeSpan.Zero,
                    User = user,
                    DailyRecords = Enumerable.Range(1, DateTime.DaysInMonth(request.Year, request.Month)).Select(day =>
                    {
                        var dayOfWeek = new DateTime(request.Year, request.Month, day).DayOfWeek;
                        bool isWorkingDay = dayOfWeek != DayOfWeek.Saturday && dayOfWeek != DayOfWeek.Sunday;

                        return new DailyRecord() { Day = day, IsWorkingDay = isWorkingDay };
                    }).ToList()
                };

                _dbContext.Add(monthly);
                _dbContext.SaveChanges();
            }
            else
            {
                monthly.DailyRecords = monthly.DailyRecords.OrderBy(dr => dr.Day).ToList();
            }

            foreach (var dr in monthly.DailyRecords)
            {
                dr.DayOfWeek = new DateTime(monthly.Year, monthly.Month, dr.Day).DayOfWeek.ToString();
            }

            return Task.FromResult(monthly);
        }
    }
}
