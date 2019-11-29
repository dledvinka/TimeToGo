using System;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public interface IDailyDeltaCalculator
    {
        TimeSpan GetDailyDelta(DailyRecord dailyRecord);
    }
}