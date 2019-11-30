import { Component, OnInit } from '@angular/core';
import { MonthlyRecordService } from '../services/monthly-record.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MonthlyRecordDto } from '../dtos/dtos';

@Component({
  selector: 'app-monthly-record-editor',
  templateUrl: './monthly-record-editor.component.html',
  styleUrls: ['./monthly-record-editor.component.css']
})
export class MonthlyRecordEditorComponent implements OnInit {
  genders = ['male', 'female'];
  mr$: Observable<MonthlyRecordDto>;
  mrForm: FormGroup;
  
  constructor(private monthlyRecordService: MonthlyRecordService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mr$ = this.monthlyRecordService.getCurrentMonth();
    this.mr$.subscribe((mr: MonthlyRecordDto) => {
      this.mrForm = this.formBuilder.group({
        userData: this.formBuilder.group({
          username: this.formBuilder.control(null, Validators.required),
          email: this.formBuilder.control(null, [Validators.email, Validators.required]),
        }),
        gender: this.formBuilder.control('male'),
        hobbies: this.formBuilder.array([]),
        dailyRecords: this.formBuilder.array([])
        //days: this.formBuilder.array([this.createDay()])

      });

      //console.log('dailyRecords', mr.dailyRecords);

      mr.dailyRecords.forEach(dr => {
        const arrival = this.formBuilder.control(null);
        const leave = this.formBuilder.control(null);
        const spentOutside = this.formBuilder.control(null);

        //console.log('dailyRecords', (<FormGroup>this.mrForm.get('dailyRecords')));

        (<FormArray>this.mrForm.get('dailyRecords')).push(this.formBuilder.group({
          arrival : arrival,
          leave: leave,
          spentOutside: spentOutside
        }));
      });
    });


  }

  onSubmit() : void {
    console.log(this.mrForm);
  }

  getControls() {
    return (<FormArray>this.mrForm.get('hobbies')).controls;
  }

  getDailyRecordsControls() {
    console.log('dailyRecords', (<FormArray>this.mrForm.get('dailyRecords')));
    return (<FormArray>this.mrForm.get('dailyRecords')).controls;
  }

  onAddHobby() {
    const control = this.formBuilder.control(null, Validators.required);
    (<FormArray>this.mrForm.get('hobbies')).controls.push(control);
  }

  //*ngFor="let hobbyControl of getControls(); let i = index"

  createDay(): FormGroup  {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

}
