import { Injectable } from '@angular/core';
import { DailyRecordDto, MonthlyRecordDto } from '../dtos/dtos';
import { Time } from './time';

@Injectable({
  providedIn: 'root'
})
export class DeltaCalculationService {

  constructor() { }

  getDailyDelta(dailyRecord: DailyRecordDto): DailyDelta {
    const deltaFromAccountingSystem = Time.parse(dailyRecord.deltaFromAccountingSystem);

    if (deltaFromAccountingSystem !== Time.zero) {
      return {value : deltaFromAccountingSystem, asString: deltaFromAccountingSystem.asString()};
    }
    
    const arrived = Time.parse(dailyRecord.arrived);
    const left = Time.parse(dailyRecord.left);
    const spentOutside = Time.parse(dailyRecord.spentOutside);
    const dailyWorkingHours = new Time(1, 8, 0);

    if (arrived === Time.zero || left === Time.zero) {
      return { value: Time.zero, asString: Time.zero.asString()};
    }

    const worked = left.substract(arrived).substract(spentOutside);
    const delta = worked.substract(dailyWorkingHours);

    return { value: delta, asString: delta.asString() };
  }

  getMonthlyDelta(overtimeFromPreviousMonth: Time, dailyDeltas: DailyDelta[]): MonthlyDelta {
    let monthlyDelta = overtimeFromPreviousMonth;

    for (let index = 0; index < dailyDeltas.length; index++) {
      const dd = dailyDeltas[index];
      monthlyDelta = monthlyDelta.add(dd.value);
    }
    return { value: monthlyDelta, asString: monthlyDelta.asString() };
  }
}

export interface DailyDelta {
  value: Time,
  asString: string;
}

export interface MonthlyDelta {
  value: Time,
  asString: string;
}
