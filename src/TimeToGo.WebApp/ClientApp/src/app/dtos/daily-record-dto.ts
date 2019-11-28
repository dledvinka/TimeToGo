interface DailyRecordDto {
    id: number;
    day: number;
    arrived: string;
    left: string;
    spentOutside: string;
    deltaFromAccountingSystem: string;
    isWorkingDay: boolean;
    dailyDelta: string;
}