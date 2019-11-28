import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyRecordService {

  private baseUrl: string;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getCurrentMonth(): Observable<MonthlyRecordDto> {
    return this.http.get<MonthlyRecordDto>(this.baseUrl + 'monthlyrecord');
  }

  saveMonth(mr: MonthlyRecordDto) {
    this.http.post<MonthlyRecordDto>(this.baseUrl + 'monthlyrecord', mr, this.httpOptions).subscribe(mr => { console.log('saved', mr) }, error => { console.log('error', error) });
  }
}
