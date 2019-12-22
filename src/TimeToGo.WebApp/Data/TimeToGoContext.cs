using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TimeToGo.WebApp.Entities;

namespace TimeToGo.WebApp.Data
{
    public class TimeToGoContext : DbContext
    {
        public DbSet<MonthlyRecord> MonthlyRecords { get; set; }
        public DbSet<User> Users { get; internal set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=TimeToGo.db3");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MonthlyRecord>().HasAlternateKey(e => new { e.Year, e.Month });
            modelBuilder.Entity<DailyRecord>().Ignore(e => e.DayOfWeek);
        }
    }
}
