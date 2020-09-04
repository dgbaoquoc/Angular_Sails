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
  public search;
  ngOnInit(): void {
    var header = document.getElementById("myHeader");
    var sticky = header.getBoundingClientRect().top;
    window.onscroll = function() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
  }

  // searchArticles() {
  //   var self = this;
  //   this.search = $("#articleName").val() ? $("#articleName").val() : "";
  //   this._dataService.sendValue(self.search.toLowerCase());
  // }

}
