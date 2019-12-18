import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DailyRecordDto } from '../dtos/dtos';
import { DailyDelta, DeltaCalculationService } from '../services/delta-calculation.service';

@Component({
  selector: '[app-daily-record]',
  templateUrl: './daily-record.component.html',
  styleUrls: ['./daily-record.component.css']
})
export class DailyRecordComponent implements OnInit {

  @Input() data: DailyRecordDto;
  @Input() dataIndex: number;
  @Input() delta: DailyDelta;
  @Output() dailyRecordChanged = new EventEmitter<number>();
  
  constructor(private deltaService: DeltaCalculationService) { }

  ngOnInit() {
    //this.delta = this.deltaService.getDailyDelta(this.data);
  }

  onArrivedChanged(value: string) {
    this.data.arrived = value;
    this.data.deltaFromAccountingSystem = '';
    this.dailyRecordChanged.emit(this.dataIndex);
  }

  onLeftChanged(value: string) {
    this.data.left = value;
    this.data.deltaFromAccountingSystem = '';
    this.dailyRecordChanged.emit(this.dataIndex);
  }

  onSpentOutsideChanged(value: string) {
    this.data.spentOutside = value;
    this.data.deltaFromAccountingSystem = '';
    this.dailyRecordChanged.emit(this.dataIndex);
  }

  onDeltaFromAccountingSystemChanged(value: string) {
    this.data.deltaFromAccountingSystem = value;
    this.data.arrived = '';
    this.data.left = '';
    this.data.spentOutside = '';
    this.dailyRecordChanged.emit(this.dataIndex);
  }

  isWorkingDayChanged(event: any) {
    const isChecked = event.target.checked;

    if (!isChecked) {
      this.data.arrived = '';
      this.data.left = '';
      this.data.spentOutside = '';
      this.data.deltaFromAccountingSystem = '';
    }
    else {

    }

    this.data.isWorkingDay = isChecked;
    this.dailyRecordChanged.emit(this.dataIndex);
  }
}
