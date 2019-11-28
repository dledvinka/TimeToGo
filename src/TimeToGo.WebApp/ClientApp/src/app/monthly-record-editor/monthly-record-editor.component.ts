import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-monthly-record-editor',
  templateUrl: './monthly-record-editor.component.html',
  styleUrls: ['./monthly-record-editor.component.css']
})
export class MonthlyRecordEditorComponent implements OnInit {

  mr$: Observable<MonthlyRecordDto>;
  mrForm: FormGroup;
  
  constructor(private monthlyRecordService: MonthlyRecordService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mr$ = this.monthlyRecordService.getCurrentMonth();
    this.mr$.subscribe((mr: MonthlyRecordDto) => {
      this.mrForm = this.formBuilder.group({
        userName: '',
        days: this.formBuilder.array([this.createDay()])

      })
    });
  }

  createDay(): FormGroup  {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

}
