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
            dbContext.SaveChanges();
        }
    }
}
