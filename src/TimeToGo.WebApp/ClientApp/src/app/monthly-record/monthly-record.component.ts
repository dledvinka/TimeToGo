import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';
import { Observable } from 'rxjs';
import { MonthlyRecordDto } from '../dtos/dtos';
import { DeltaCalculationService, DailyDelta, MonthlyDelta } from '../services/delta-calculation.service';
import { Time } from '../services/time';
import { Router } from '@angular/router';

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
    private deltaService: DeltaCalculationService, 
    private router: Router, ) { }

  ngOnInit() {
    this.monthlyRecordService.getCurrentMonth().subscribe((mr: MonthlyRecordDto) => {
      console.log('data received', mr);
      this.mr = mr;

      this.dailyDeltas = [];
      for (let index = 0; index < mr.dailyRecords.length; index++) {
        const dr = mr.dailyRecords[index];
        this.dailyDeltas[index] = this.deltaService.getDailyDelta(dr);
        //console.log('index', index, this.dailyDeltas[index]);
      }
      const overtimeFromPreviousMonth = Time.parse(this.mr.overtimeFromPreviousMonth);
      this.monthlyDelta = this.deltaService.getMonthlyDelta(overtimeFromPreviousMonth, this.dailyDeltas);

      console.log('ot', overtimeFromPreviousMonth);
      console.log('dd', this.dailyDeltas);
    });
  }

  onSubmit() {
    console.log('onSubmit', this.mr);
    this.monthlyRecordService.saveMonth(this.mr);
    const routerResult = this.router.navigateByUrl("/monthly-record");
    console.log('routerResult', routerResult);
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
