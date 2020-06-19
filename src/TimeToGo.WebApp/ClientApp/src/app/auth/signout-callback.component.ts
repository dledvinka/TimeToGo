import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signout-callback-component',
  template: '<div></div>'
})
export class SignoutCallbackComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {

    }
    
    ngOnInit(): void {
        this.authService.completeLogout().then(_ => {
            this.router.navigate(['/'], {replaceUrl: true} );
        });
    }
  
}
