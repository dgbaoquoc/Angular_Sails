import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { SendDataService } from '../../services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  constructor(private _articlesPostService: ArticlesPostService, private _dataService: SendDataService) { }
  start = {
    startArticle: 0,
    searchArticle: ""
  }
  public search;
  ngOnInit(): void {
    var self = this;
  }

  searchArticles(value) {
    var self = this;
    self.start.searchArticle = value;
    self._articlesPostService.getArticles(self.start)
      .subscribe(function(data) {
        if(data.status == "success") {
          self.searchEvent.emit(data.articles);
        }
      })
  }

}
