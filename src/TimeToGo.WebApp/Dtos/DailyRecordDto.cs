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
        public string Arrived { get; set; }
        public string Left { get; set; }
        public string SpentOutside { get; set; }
        public string DeltaFromAccountingSystem { get; set; }
        public bool IsWorkingDay { get; set; }
        public string DailyDelta { get; set; }
    }
}
