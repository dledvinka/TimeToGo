using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public class DailyDeltaCalculator : IDailyDeltaCalculator
    {
        public TimeSpan GetDailyDelta(DailyRecord dailyRecord)
        {
            var dailyWorkingHours = TimeSpan.FromHours(8);

            if (!dailyRecord.IsWorkingDay)
            {
                return TimeSpan.Zero;
            }
            else if (dailyRecord.DeltaFromAccountingSystem.HasValue)
            {
                return dailyRecord.DeltaFromAccountingSystem.Value;
            }
            else if (dailyRecord.ArrivalTime.HasValue && dailyRecord.LeaveTime.HasValue && dailyRecord.SpentOutside.HasValue)
            {
                return dailyWorkingHours - (dailyRecord.LeaveTime.Value - dailyRecord.ArrivalTime.Value - dailyRecord.SpentOutside.Value);
            }
            else
            {
                return -dailyWorkingHours;
            }
        }
    }
}
