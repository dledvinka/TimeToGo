import { Injectable } from '@angular/core';
import { DailyRecordDto, MonthlyRecordDto } from '../dtos/dtos';
import { Time } from './time';

@Injectable({
  providedIn: 'root'
})
export class DeltaCalculationService {

  constructor() { }

  getDailyDelta(dailyRecord: DailyRecordDto): DailyDelta {
    const arrived = Time.parse(dailyRecord.arrived);
    return { value: "00:00" };
  }

  getMonthlyDelta(monthlyRecord: MonthlyRecordDto): MothlyDelta {
    return { value: "00:00" };
  }
}

export interface DailyDelta {
  value: string;
}

export interface MothlyDelta {
  value: string;
}
