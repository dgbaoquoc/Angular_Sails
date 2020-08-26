import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // User
  private _forgotUrl = "http://localhost:1337/forgot"
  private _submitPasswordtUrl = "http://localhost:1337/reset-password"
  private _registerUrl = "http://localhost:1337/register"
  private _loginUrl = "http://localhost:1337/login"
  private _testUrl ="http://localhost:1337/test"
  private _getCurrentUserUrl ="http://localhost:1337/getCurrentUser"

  // Articles
  private _getArticlesUrl = "http://localhost:1337/getPosts"
  private _getDetailArticlesUrl = "http://localhost:1337/posts/"
  private _getSearchedArticlesUrl = "http://localhost:1337/getSearchedPosts"
  private _ArticleLimit = "?limit=2";
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

  getArticles() {
    return this.http.get<any>(`${this._getArticlesUrl}${this._ArticleLimit}`)
  }

  getDetailArticle(id) {
    return this.http.get<any>(`${this._getDetailArticlesUrl}${id}`)
  }

  getSearchedArticles(value) {
    return this.http.post<any>(this._getSearchedArticlesUrl, value)
  }

  getCurrentUser() {
    return this.http.get<any>(this._getCurrentUserUrl)
  }
}
