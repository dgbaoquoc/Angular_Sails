import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:1337/register"
  private _loginUrl = "http://localhost:1337/login"
  private _testUrl ="http://localhost:1337/test"

  constructor(private http:HttpClient, private router:Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  testUrl() {
    return this.http.get<any>(this._testUrl)
  }
  
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logOut() {
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
