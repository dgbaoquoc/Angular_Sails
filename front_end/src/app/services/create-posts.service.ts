import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatePostsService {
  private _createPost = "http://localhost:1337/createArticle"
  constructor(private http:HttpClient) { }
  postArticle(articles) {
    return this.http.post<any>(this._createPost, articles)
  }


}
