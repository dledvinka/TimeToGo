import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signin-callback-component',
  template: '<div></div>'
})
export class SigninCallbackComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {

    }
    
    ngOnInit(): void {
        this.authService.completeLogin().then(user => {
            this.router.navigate(['/'], {replaceUrl: true} );
        });
    }
  
}
