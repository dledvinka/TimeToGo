interface MonthlyRecordDto {
  id: number;
  year: number;
  month: number;
  dailyRecords: DailyRecordDto[];
  overtimeFromPreviousMonthInMinutes: number;
  monthlyDeltaInMinutes: number;
  user: UserDto;
}