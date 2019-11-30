export interface DailyRecordDto {
    id: number;
    day: number;
    arrived: string;
    left: string;
    spentOutside: string;
    deltaFromAccountingSystem: string;
    isWorkingDay: boolean;
    dailyDelta: string;
}

export interface MonthlyRecordDto {
    id: number;
    year: number;
    month: number;
    dailyRecords: DailyRecordDto[];
    overtimeFromPreviousMonth: string;
    monthlyDelta: string;
    user: UserDto;
}

export interface UserDto {
    id: number;
    name: string;
    dailyWorkingHoursInMinutes: number;
}