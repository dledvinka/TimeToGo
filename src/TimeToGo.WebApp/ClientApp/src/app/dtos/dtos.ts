export interface DailyRecordDto {
    id: number;
    day: number;
    arrived: string;
    left: string;
    spentOutside: string;
    deltaFromAccountingSystem: string;
    isWorkingDay: boolean;
}

export interface MonthlyRecordDto {
    id: number;
    year: number;
    month: number;
    dailyRecords: DailyRecordDto[];
    overtimeFromPreviousMonth: string;
    user: UserDto;
}

export interface UserDto {
    id: number;
    name: string;
    dailyWorkingHoursInMinutes: number;
}