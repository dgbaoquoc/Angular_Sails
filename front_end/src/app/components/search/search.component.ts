import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../../services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public search;
  constructor(private _dataService: SendDataService) { }

  ngOnInit(): void {
  }

  searchArticles() {
    var self = this;
    this.search = $("#articleName").val() ? $("#articleName").val() : "";
    this._dataService.sendValue(self.search.toLowerCase());
  }

}
