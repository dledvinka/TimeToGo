import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monthly-record',
  templateUrl: './monthly-record.component.html',
  styleUrls: ['./monthly-record.component.css']
})
export class MonthlyRecordComponent implements OnInit {

  mr: MonthlyRecordDto;
  
  constructor(private monthlyRecordService: MonthlyRecordService) { }

  ngOnInit() {
    this.monthlyRecordService.getCurrentMonth().subscribe((mr: MonthlyRecordDto) => {
      console.log('data received', mr);
      this.mr = mr;
    });
  }

  onSubmit() {
    console.log('onSubmit', this.mr);
    this.monthlyRecordService.saveMonth(this.mr);
  }


}
