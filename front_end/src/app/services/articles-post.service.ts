import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { articles } from './articles-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesPostService {

  private url: string = "assets/data/articles.json"
  constructor(private http: HttpClient) {}
  getArticles() : Observable<articles[]> {
    return this.http.get<articles[]>(this.url);
  }


}
