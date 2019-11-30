import { TestBed } from '@angular/core/testing';

import { DeltaCalculationService } from './delta-calculation.service';
import { DailyRecordDto } from '../dtos/dtos';

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
      deltaFromAccountingSystem: null,
      dailyDelta: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toBe('1:00');
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
      deltaFromAccountingSystem: null,
      dailyDelta: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toBe('-1:00');
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
      deltaFromAccountingSystem: null,
      dailyDelta: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toBe('');
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
      deltaFromAccountingSystem: '-1:00',
      dailyDelta: null
    };
    const result = service.getDailyDelta(dailyRecord);
    expect(result.value).toBe('-1:00');
  });
});
