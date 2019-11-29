using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public class MonthlyDeltaCalculator : IMonthlyDeltaCalculator
    {
        public TimeSpan GetMonthlyDelta(MonthlyRecord monthly)
        {
            TimeSpan monthlyDelta = monthly.OvertimeFromPreviousMonth;
            monthly.DailyRecords.Aggregate(monthlyDelta, (acc, dr) => acc + dr.DailyDelta);

            foreach (var dr in monthly.DailyRecords)
            {
                monthlyDelta += dr.DailyDelta;
            }

            return monthlyDelta;
        }
    }
}
