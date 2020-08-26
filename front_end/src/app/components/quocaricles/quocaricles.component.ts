import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-quocaricles',
  templateUrl: './quocaricles.component.html',
  styleUrls: ['./quocaricles.component.css']
})
export class QuocariclesComponent implements OnInit {
  articles = [];
  // searchText = {
  //   value: ''
  // }

  constructor(private _auth:AuthService,
              private _route:Router) { }

  ngOnInit(): void {
    this._auth.getArticles()
    .subscribe(
      res => {
        if(res.status == 'success') {
          this.articles = res.articles
        }
      }
    ) 
  }

  submitSearch(value) {
    this.articles = value
  }

  // @HostListener("window:scroll", [])
  // onScroll(): void {
  // if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight ) {
  //         console.log('123')
  //     }
  // }

}
