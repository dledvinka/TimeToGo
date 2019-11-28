import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyRecordService {

  private baseUrl: string;

  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getCurrentMonth() : Observable<MonthlyRecordDto> {
    return this.http.get<MonthlyRecordDto>(this.baseUrl + 'monthlyrecord');
  }
}
