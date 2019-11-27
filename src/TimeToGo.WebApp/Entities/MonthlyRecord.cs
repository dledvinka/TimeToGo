using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeToGo.WebApp.Entities
{
    public class MonthlyRecord
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public List<DailyRecord> DailyRecords { get; set; }
        public TimeSpan OvertimeFromPreviousMonth { get; set; }
        public TimeSpan MonthlyDelta { get; set; }
        public User User { get; set; }
    }
}
