import { Component, OnInit } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public test = [];
  constructor(private _articlesPostService: ArticlesPostService) { }

  ngOnInit() {
    var self = this;
    this._articlesPostService.getArticles().toPromise()
        .then(function(data) {
          for(let i in data) {
            if(data.hasOwnProperty(i)) {
              self.test.push(data[i]);
            }
          }
        })

  }

}
