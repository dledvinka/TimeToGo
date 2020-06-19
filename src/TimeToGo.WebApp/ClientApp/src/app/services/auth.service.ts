import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager: UserManager;
  private user: User;
  private loginChangedSubject = new Subject<boolean>();
  private readonly stsSettings: UserManagerSettings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}/signin-callback`, 
    scope: 'openid profile',
    response_type: 'code', // 'id_token token' (implicit flow),
    post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
    // metadata: {
    //   authorization_endpoint: `${Constants.stsAuthority}/authorize`,
    //   end_session_endpoint: `${Constants.stsAuthority}/v2/logout`,
    //   token_endpoint: `${Constants.stsAuthority}/oauth/token`,
    //   issuer: `${Constants.stsAuthority}/.well-known/openid-configuration`,
    // }
  };

  loginChanged = this.loginChangedSubject.asObservable();

  constructor() {
    this.userManager = new UserManager(this.stsSettings);
  }

  login() {
    return this.userManager.signinRedirect();
  }

  logout() {
    console.log('logout user:', this.userManager)
    this.userManager.signoutRedirect(this.stsSettings);
  }

  completeLogout() {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then(user => {
      const userCurrent = !!user && user.expired;

      if (this.user !== user) {
        console.log('userCurrent:', userCurrent);
        console.log('user:', user);
        this.loginChangedSubject.next(userCurrent);
      }

      this.user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }
}
