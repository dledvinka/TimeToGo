import { TestBed } from '@angular/core/testing';

import { DeltaCalculationService } from './delta-calculation.service';
import { DailyRecordDto } from '../dtos/dtos';
import { Time } from './time';

describe('DeltaCalculationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeltaCalculationService = TestBed.get(DeltaCalculationService);
    expect(service).toBeTruthy();
  });

  it('should return correct positive daily delta when simulating working day', () => {
    const service: DeltaCalculationService = TestBed.get(DeltaCalculationService);
    const dailyRecord: DailyRecordDto = {
      id: 1,
      arrived:'6:20',
      left: '15:50',
      spentOutside: '0:30',
      day: 1,
      isWorkingDay: true,
      deltaFromAccountingSystem: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toEqual(new Time(1, 1, 0));
    expect(result.asString).toBe('1:00');
  });

  it('should return correct negative daily delta when simulating working day', () => {
    const service: DeltaCalculationService = TestBed.get(DeltaCalculationService);
    const dailyRecord: DailyRecordDto = {
      id: 1,
      arrived:'8:20',
      left: '15:50',
      spentOutside: '0:30',
      day: 1,
      isWorkingDay: true,
      deltaFromAccountingSystem: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toEqual(new Time(-1, 1, 0));
    expect(result.asString).toBe('-1:00');
  });

  it('should return empty value if not a working day', () => {
    const service: DeltaCalculationService = TestBed.get(DeltaCalculationService);
    const dailyRecord: DailyRecordDto = {
      id: 1,
      arrived:'',
      left: '',
      spentOutside: '',
      day: 1,
      isWorkingDay: false,
      deltaFromAccountingSystem: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toEqual(new Time(1, 0, 0));
    expect(result.asString).toBe('0:00');
  });

  it('should return correct daily delta when delta given by accounting system', () => {
    const service: DeltaCalculationService = TestBed.get(DeltaCalculationService);
    const dailyRecord: DailyRecordDto = {
      id: 1,
      arrived:'',
      left: '',
      spentOutside: '',
      day: 1,
      isWorkingDay: true,
      deltaFromAccountingSystem: '-1:00'
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toEqual(new Time(-1, 1, 0));
    expect(result.asString).toBe('-1:00');
  });
});
