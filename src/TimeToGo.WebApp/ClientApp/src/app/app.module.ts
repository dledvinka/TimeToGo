import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MonthlyRecordComponent } from './monthly-record/monthly-record.component';
import { DailyRecordComponent } from './daily-record/daily-record.component';
import { SigninCallbackComponent } from './auth/signin-callback.component';
import { SignoutCallbackComponent } from './auth/signout-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MonthlyRecordComponent,
    DailyRecordComponent,
    SigninCallbackComponent,
    SignoutCallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MonthlyRecordComponent, pathMatch: 'full' },
      { path: 'signin-callback', component: SigninCallbackComponent },
      { path: 'signout-callback', component: SignoutCallbackComponent }
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
