import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:1337/register"
  private _loginUrl = "http://localhost:1337/login"

  constructor(private http:HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }
  
  getUser() {
    return this.http.get("http://localhost:1337/getuser")
  }

  getArticle() {
    return this.http.get("http://localhost:1337/getarticle")
  }
}
