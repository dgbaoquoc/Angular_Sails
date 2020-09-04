import { Component, OnInit, Input } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { SendDataService } from '../../services/send-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service'
declare var $: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  public test = [];
  constructor(private _articlesPostService: ArticlesPostService, private _dataService: SendDataService, private router: Router, private authService: AuthService) { }
  start = {
    startArticle: 0,
    searchArticle: ""
  }


  ngOnInit(): void {
    var self= this;
    var x = 500;
    this.subscription1 = this._dataService.valueFromSearch$
      .subscribe(function(chris) {
        self.start.startArticle = 0;
        self.start.searchArticle = chris;
        self.takeArticles();
        x = 500;
      })
    $(window).scroll(function(){
      var y = $(window).scrollTop();
      if(y >= x) {
          self.start.startArticle += 4;
          self._articlesPostService.getArticles(self.start)
            .subscribe(function(data) {
              if(data.status == "success") {
                for(let i in data.articles) {
                  self.test.push(data.articles[i])
                }
              }
              else {
                self.authService.logOut();
                self.router.navigate(['/login']);
              }
            })
          x += 500;
      }
  });
  }

  takeArticles() {
    var self = this;
    this.subscription2 = self._articlesPostService.getArticles(self.start)
        .subscribe(function(data) {
          if(data.status == "success") {
            self.test = data.articles;
          }
          else {
            self.authService.logOut();
            self.router.navigate(['/login']);
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
