import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';
import { MonthlyRecordDto } from '../dtos/dtos';
import { DeltaCalculationService, DailyDelta, MonthlyDelta } from '../services/delta-calculation.service';
import { Time } from '../services/time';

@Component({
  selector: 'app-monthly-record',
  templateUrl: './monthly-record.component.html',
  styleUrls: ['./monthly-record.component.css']
})
export class MonthlyRecordComponent implements OnInit {

  mr: MonthlyRecordDto;
  dailyDeltas: DailyDelta[];
  monthlyDelta: MonthlyDelta;

  constructor(
    private monthlyRecordService: MonthlyRecordService, 
    private deltaService: DeltaCalculationService) { }

  ngOnInit() {
    this.loadData();
  }

  onSubmit() {
    this.monthlyRecordService.saveMonth(this.mr);
    this.loadData();
  }

  loadData(): void {
    this.monthlyRecordService.getCurrentMonth().subscribe((mr: MonthlyRecordDto) => {
      this.mr = mr;

      this.dailyDeltas = [];
      for (let index = 0; index < mr.dailyRecords.length; index++) {
        const dr = mr.dailyRecords[index];
        this.dailyDeltas[index] = this.deltaService.getDailyDelta(dr);
      }
      const overtimeFromPreviousMonth = Time.parse(this.mr.overtimeFromPreviousMonth);
      this.monthlyDelta = this.deltaService.getMonthlyDelta(overtimeFromPreviousMonth, this.dailyDeltas);
    });
  }

  onDailyRecordChanged(index: number): void {
    const dr = this.mr.dailyRecords[index];
    this.dailyDeltas[index] = this.deltaService.getDailyDelta(dr);
    const overtimeFromPreviousMonth = Time.parse(this.mr.overtimeFromPreviousMonth);
    this.monthlyDelta = this.deltaService.getMonthlyDelta(overtimeFromPreviousMonth, this.dailyDeltas);
  }

  onOvertimeFromPreviousMonth(valueChanged: string): void {
    this.mr.overtimeFromPreviousMonth = valueChanged;
    const overtimeFromPreviousMonth = Time.parse(this.mr.overtimeFromPreviousMonth);
    this.monthlyDelta = this.deltaService.getMonthlyDelta(overtimeFromPreviousMonth, this.dailyDeltas);
  }
}
