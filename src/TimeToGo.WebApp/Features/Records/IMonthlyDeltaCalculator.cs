using System;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Features.Records
{
    public interface IMonthlyDeltaCalculator
    {
        TimeSpan GetMonthlyDelta(MonthlyRecord monthly);
    }
}