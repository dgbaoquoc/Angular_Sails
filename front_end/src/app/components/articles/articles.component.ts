import { Component, OnInit, Testability } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { SendDataService } from '../../services/send-data.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public test = [];
  constructor(private _articlesPostService: ArticlesPostService, private _dataService: SendDataService, private toastr: ToastrService) { }
  start = {
    startArticle: 0,
    searchArticle: ""
  }
  ngOnInit() {
    var self = this;
    var x = 500;
    this._dataService.valueFromSearch
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
    this.showToastr();
  }

  takeArticles() {
    var self = this;
    self._articlesPostService.getArticles(self.start).toPromise()
        .then(function(data) {
          if(data.status == "success") {
            for(let i in data.articles) {
              self.test.push(data.articles[i]);
            }
          }
        })
        .catch(function(err) {
          console.log(err)
        })
  }

  showToastr() {
    var self = this;
    this._dataService.valueToast
      .subscribe(function(val) {
        if(val == "success") {
          self.toastr.success('Created article successfully')
        }
        else if(val == "fail") {
          self.toastr.error('Created failed!')
        }
      })
  }

}
