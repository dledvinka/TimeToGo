using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeToGo.WebApp.Dtos
{
    public class DailyRecordDto
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public DateTime? LeaveTime { get; set; }
        public double? SpentOutsideInMinutes { get; set; }
        public double? DeltaFromAccountingSystemInMinutes { get; set; }
        public bool IsWorkingDay { get; internal set; }
        public double DailyDeltaInMinutes { get; internal set; }
    }
}
