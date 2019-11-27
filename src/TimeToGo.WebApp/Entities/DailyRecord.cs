using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeToGo.WebApp.Entities
{
    public class DailyRecord
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public DateTime? LeaveTime { get; set; }
        public TimeSpan? SpentOutside { get; set; }
        public TimeSpan? DeltaFromAccountingSystem { get; set; }
        public bool IsWorkingDay { get; internal set; }
        public TimeSpan DailyDelta { get; internal set; }
    }
}
