import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService:AuthService, private _router:Router) {}

  canActivate():boolean {
    var user = localStorage.getItem('token');
    var currentTime = new Date().getTime() / 1000;
    var expiration = jwt_decode(user).exp;
    var email = jwt_decode(user).email;
    var refreshToken = localStorage.getItem('refresh');
    if(currentTime < expiration) {
      this._authService.refreshToken({email: email, refreshToken: refreshToken}).toPromise()
        .then(function(data) {
          if(data.status == 'success') {
            console.log(data.token);
            localStorage.setItem('token', data.token)
          }
        })
    }
    if(this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/']);
      return false
    }
  }

}
