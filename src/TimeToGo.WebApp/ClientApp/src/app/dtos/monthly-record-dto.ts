interface MonthlyRecordDto {
  id: number;
  year: number;
  month: number;
  dailyRecords: DailyRecordDto[];
  overtimeFromPreviousMonth: string;
  monthlyDelta: string;
  user: UserDto;
}