import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _forgotUrl = "http://localhost:1337/forgot"
  private _submitPasswordtUrl = "http://localhost:1337/reset-password"
  private _registerUrl = "http://localhost:1337/register"
  private _loginUrl = "http://localhost:1337/login"
  private _testUrl ="http://localhost:1337/test"
  private _token = "http://localhost:1337/newToken"
  private _delete = "http://localhost:1337/deleteArticle"
  private _edit = "http://localhost:1337/editArticle"
  private _save = "http://localhost:1337/saveArticle"
  private _deleteUser = "http://localhost:1337/deleteUser"
  private _editUser = "http://localhost:1337/editUser"
  private _saveUser = "http://localhost:1337/saveUser"

  constructor(private http:HttpClient, private router:Router) { }

  forgotPassword(email) {
    return this.http.post<any>(this._forgotUrl, email)
  }

  submitNewPassword(forgotUserData) {
    return this.http.post<any>(this._submitPasswordtUrl, forgotUserData)
  }

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

  refreshToken(data: any) {
    return this.http.post<any>(this._token, data)
  }

  deleteArticle(data: any) {
    return this.http.post<any>(this._delete, data)
  }

  editArticle(data: any) {
    return this.http.get<any>(this._edit, {params: data})
  }

  saveArticle(data: any) {
    return this.http.post<any>(this._save, data)
  }

  deleteUser(data: any) {
    return this.http.post<any>(this._deleteUser, data)
  }

  editUser(data: any) {
    return this.http.get<any>(this._editUser, {params: data})
  }

  saveUser(data: any) {
    return this.http.post<any>(this._saveUser, data)
  }
}
