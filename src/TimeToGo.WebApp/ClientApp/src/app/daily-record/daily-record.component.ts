import { Component, OnInit, Input } from '@angular/core';

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

}
