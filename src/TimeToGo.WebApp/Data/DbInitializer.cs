using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Data
{
    public class DbInitializer
    {
        public static void Initialize(TimeToGoContext dbContext)
        {
            dbContext.Database.EnsureCreated();

            if (dbContext.Users.Any())
            {
                return;   // DB has been seeded
            }

            var user = new User() { Name = "Hanička", DailyWorkingHours = TimeSpan.FromHours(8) };

            dbContext.Add(user);

            var monthly = new MonthlyRecord()
            {
                User = user,
                OvertimeFromPreviousMonth = TimeSpan.FromHours(1),
                Year = 2019,
                Month = 11,
                DailyRecords = new List<DailyRecord>
                {
                    new DailyRecord() { Day = 1, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-81), IsWorkingDay = true},
                    new DailyRecord() { Day = 2},
                    new DailyRecord() { Day = 3},
                    new DailyRecord() { Day = 4, DeltaFromAccountingSystem = TimeSpan.FromMinutes(200), IsWorkingDay = true},
                    new DailyRecord() { Day = 5, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-68), IsWorkingDay = true},
                    new DailyRecord() { Day = 6, DeltaFromAccountingSystem = TimeSpan.FromMinutes(200), IsWorkingDay = true},
                    new DailyRecord() { Day = 7, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-45), IsWorkingDay = true},
                    new DailyRecord() { Day = 8, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-83), IsWorkingDay = true},
                    new DailyRecord() { Day = 9},
                    new DailyRecord() { Day = 10},
                    new DailyRecord() { Day = 11, DeltaFromAccountingSystem = TimeSpan.FromMinutes(160), IsWorkingDay = true},
                    new DailyRecord() { Day = 12, DeltaFromAccountingSystem = TimeSpan.FromMinutes(19), IsWorkingDay = true},
                    new DailyRecord() { Day = 13, DeltaFromAccountingSystem = TimeSpan.Zero, IsWorkingDay = true},
                    new DailyRecord() { Day = 14, DeltaFromAccountingSystem = TimeSpan.FromMinutes(28), IsWorkingDay = true},
                    new DailyRecord() { Day = 15, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-150), IsWorkingDay = true},
                    new DailyRecord() { Day = 16},
                    new DailyRecord() { Day = 17},
                    new DailyRecord() { Day = 18, DeltaFromAccountingSystem = TimeSpan.FromMinutes(190), IsWorkingDay = true},
                    new DailyRecord() { Day = 19, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-79), IsWorkingDay = true},
                    new DailyRecord() { Day = 20, DeltaFromAccountingSystem = TimeSpan.FromMinutes(199), IsWorkingDay = true},
                    new DailyRecord() { Day = 21, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-120), IsWorkingDay = true},
                    new DailyRecord() { Day = 22, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-210), IsWorkingDay = true},
                    new DailyRecord() { Day = 23},
                    new DailyRecord() { Day = 24},
                    new DailyRecord() { Day = 25, DeltaFromAccountingSystem = TimeSpan.FromMinutes(200), IsWorkingDay = true},
                    new DailyRecord() { Day = 26, DeltaFromAccountingSystem = TimeSpan.FromMinutes(-96), IsWorkingDay = true},
                    new DailyRecord() { Day = 27, DeltaFromAccountingSystem = TimeSpan.FromMinutes(200), IsWorkingDay = true},
                    new DailyRecord() { Day = 28, DeltaFromAccountingSystem = TimeSpan.FromMinutes(180), IsWorkingDay = true},
                    new DailyRecord() { Day = 29, DeltaFromAccountingSystem = TimeSpan.Zero, IsWorkingDay = true},
                    new DailyRecord() { Day = 30},

                }
            };
            dbContext.Add(monthly);
            dbContext.SaveChanges();
        }
    }
}
