import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesPostService {

  private getArticle = "http://localhost:1337/showArticles"
  constructor(private http: HttpClient) {}

  getArticles(data: any) : Observable<any> {
    // let parmam1 = new HttpParams();
    // Object.keys(data).forEach(function(key) {
    //   parmam1 = parmam1.append(key, data[key])
    // })
    return this.http.get<any>(this.getArticle, {params: data});
  }

}
