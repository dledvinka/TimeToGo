interface DailyRecordDto {
    id: number;
    day: number;
    arrivalTime: Date;
    leaveTime: Date;
    spentOutsideInMinutes: number;
    deltaFromAccountingSystemInMinutes: number;
    isWorkingDay: boolean;
    dailyDeltaInMinutes: number;
}