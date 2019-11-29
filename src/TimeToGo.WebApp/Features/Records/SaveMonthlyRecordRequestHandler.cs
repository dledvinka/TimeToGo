using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeToGo.WebApp.Data;

namespace TimeToGo.WebApp.Features.Records
{
    public class SaveMonthlyRecordRequestHandler : IRequestHandler<SaveMonthlyRecordRequest>
    {
        private readonly TimeToGoContext _dbContext;

        public SaveMonthlyRecordRequestHandler(TimeToGoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Unit> Handle(SaveMonthlyRecordRequest request, CancellationToken cancellationToken)
        {
            var dto = request.Data;

            var monthly = _dbContext.MonthlyRecords
                .Include(mr => mr.DailyRecords)
                //.Include(mr => mr.User)
                .FirstOrDefault(mr => mr.Id == dto.Id);

            monthly.OvertimeFromPreviousMonth = TimeSpanFromString(dto.OvertimeFromPreviousMonth);

            foreach (var dailyDto in dto.DailyRecords)
            {
                var daily = monthly.DailyRecords.Single(dr => dr.Id == dailyDto.Id);
                daily.ArrivalTime = DateTimeFromString(monthly.Year, monthly.Month, daily.Day, dailyDto.Arrived);
                daily.LeaveTime = DateTimeFromString(monthly.Year, monthly.Month, daily.Day, dailyDto.Left);
                daily.SpentOutside = TimeSpanFromString(dailyDto.SpentOutside);
                daily.DeltaFromAccountingSystem = TimeSpanFromString(dailyDto.DeltaFromAccountingSystem);
                daily.IsWorkingDay = dailyDto.IsWorkingDay;
            }

            _dbContext.SaveChanges();

            return Unit.Task;
        }

        private DateTime? DateTimeFromString(int year, int month, int day, string dt)
        {
            if (dt == null || string.IsNullOrWhiteSpace(dt))
            {
                return null;
            }
            
            var split = dt.Split(":");
            int hour = Int32.Parse(split[0]);
            int minute = Int32.Parse(split[1]);
            return new DateTime(year, month, day, hour, minute, 0);
        }

        private TimeSpan TimeSpanFromString(string dt)
        {
            if (dt == null || string.IsNullOrWhiteSpace(dt))
            {
                return TimeSpan.Zero;
            }

            var split = dt.Split(":");
            int multiplier = split[0].Contains("-") ? -1 : 1;
            split[0] = split[0].Replace("-", string.Empty);
            int hour = Int32.Parse(split[0]);
            int minute = Int32.Parse(split[1]);
            int totalMinutes = multiplier * (hour * 60 + minute);
            return TimeSpan.FromMinutes(totalMinutes);
        }
    }
}
