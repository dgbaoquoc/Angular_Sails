import { Component, OnInit, Testability } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { SendDataService } from '../../services/send-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  public test = [];
  constructor(private _articlesPostService: ArticlesPostService, private _dataService: SendDataService, private router: Router) { }
  start = {
    startArticle: 0,
    searchArticle: ""
  }
  ngOnInit() {
    var self = this;
    var x = 500;
    this.subscription1 = this._dataService.valueFromSearch$
      .subscribe(function(chris) {
        self.test.length = 0;
        self.start.startArticle = 0;
        self.start.searchArticle = chris;
        self.takeArticles();
        x = 500;
      })
    $(window).scroll(function(){
        var y = $(window).scrollTop();
        if(y >= x) {
            self.start.startArticle += 2;
            self.takeArticles();
            x += y;
        }
    });
  }

  takeArticles() {
    var self = this;
    this.subscription2 = self._articlesPostService.getArticles(self.start)
        .subscribe(function(data) {
          if(data.status == "success") {
            for(let i in data.articles) {
              self.test.push(data.articles[i]);
            }
          }
        })
  }


  read(idArticle) {
    var self = this;
    this.router.navigate(['/postBlog', idArticle]);
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if(this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
