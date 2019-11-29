using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeToGo.WebApp.Dtos
{
    public class MonthlyRecordDto
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public List<DailyRecordDto> DailyRecords { get; set; }
        public string OvertimeFromPreviousMonth { get; set; }
        public string MonthlyDelta { get; set; }
        public UserDto User { get; set; }
    }
}
