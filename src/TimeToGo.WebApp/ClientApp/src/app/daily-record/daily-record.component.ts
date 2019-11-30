import { Component, OnInit, Input } from '@angular/core';
import { DailyRecordDto } from '../dtos/dtos';

@Component({
  selector: '[app-daily-record]',
  templateUrl: './daily-record.component.html',
  styleUrls: ['./daily-record.component.css']
})
export class DailyRecordComponent implements OnInit {

  @Input() data: DailyRecordDto;
  
  constructor() { }

  ngOnInit() {
  }

  onArrivedChanged(value: string) {
    this.data.arrived = value;
    this.data.deltaFromAccountingSystem = '';
  }

  onLeftChanged(value: string) {
    this.data.left = value;
    this.data.deltaFromAccountingSystem = '';
  }

  onSpentOutsideChanged(value: string) {
    this.data.spentOutside = value;
    this.data.deltaFromAccountingSystem = '';
  }

  onDeltaFromAccountingSystemChanged(value: string) {
    this.data.deltaFromAccountingSystem = value;
    this.data.arrived = '';
    this.data.left = '';
    this.data.spentOutside = '';
  }

  isWorkingDayChanged(event: any) {
    const isChecked = event.target.checked;
    console.log('isChecked', isChecked);

    if (!isChecked) {
      this.data.arrived = '';
      this.data.left = '';
      this.data.spentOutside = '';
      this.data.deltaFromAccountingSystem = '';
    }
    else {

    }

    this.data.isWorkingDay = isChecked;
    this.data.dailyDelta = this.getDailyDelta(this.data);
  }

  getDailyDelta(dailyRecord: DailyRecordDto): string {
    return '0:00';
  }

}
