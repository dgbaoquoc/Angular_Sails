import { Component, OnInit } from '@angular/core';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { SendDataService } from '../../services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public test = [];
  constructor(private _articlesPostService: ArticlesPostService, private _dataService: SendDataService) { }
  start = {
    startArticle: 0,
    searchArticle: ""
  }
  public search;
  ngOnInit(): void {
    var self = this;
  }

  searchArticles() {
    var self = this;
    this.search = $("#articleName") ? $("#articleName").val() : "";
    this._dataService.sendValue(self.search);
  }

}
