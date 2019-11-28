import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';

@Component({
  selector: 'app-monthly-record-editor',
  templateUrl: './monthly-record-editor.component.html',
  styleUrls: ['./monthly-record-editor.component.css']
})
export class MonthlyRecordEditorComponent implements OnInit {

  mr: MonthlyRecordDto;
  
  constructor(private monthlyRecordService: MonthlyRecordService) { }

  ngOnInit() {
    this.mr = this.monthlyRecordService.getCurrentMonth();
  }

}
