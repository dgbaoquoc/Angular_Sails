import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-homepage',
  templateUrl: './body-homepage.component.html',
  styleUrls: ['./body-homepage.component.css']
})
export class BodyHomepageComponent implements OnInit {
  public test = [];
  start = {
    startArticle: 0,
    searchArticle: ""
  }
  constructor(private _auth:AuthService,
    private _router:Router, private _articlesPostService: ArticlesPostService) { }

  ngOnInit(): void {
    var self = this;
    self._articlesPostService.getArticles(self.start)
      .subscribe(function(data) {
        if(data.status == "success") {
          for(let i in data.articles) {
            self.test.push(data.articles[i]);
          }
        }
      })
  }

  submitSearch(value) {
    this.test = value;
  }


}
