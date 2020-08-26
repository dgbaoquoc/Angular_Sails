import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  
  searchText = {
    value: ''
  }

  constructor(private _auth:AuthService,
              private _router:Router) { }
  
  
  ngOnInit(): void {
  
  }

  submitSearch(value) {
    //Search them ten tac gia


    // $(".overlay").show();
    this.searchText.value = value;
    this._auth.getSearchedArticles(this.searchText)
    .subscribe(
      res => {
        // console.log(res)
        if(res.status == 'success') {
          this.searchEvent.emit(res.articles);
        }
        // $(".overlay").hide();
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._auth.logOut();
            this._router.navigate(['/login']);
          }
        }
      }
    ) 
  }
}
