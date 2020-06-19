import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }
}
