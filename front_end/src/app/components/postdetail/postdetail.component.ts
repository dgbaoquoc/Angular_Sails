import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'jquery';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  article = {
    id: this._activatedRoute.snapshot.params.id,
    title: '',
    content: '',
    author: ''
  }
  
  
  constructor(private _auth:AuthService,
    private _route:Router,
    private _activatedRoute:ActivatedRoute) { }
    
    ngOnInit(): void {
      // getDetailArticle
      this._auth.getDetailArticle(this.article.id)
      .subscribe(
        res => {
          // console.log(res)
          if(res.status == 'success') {
            this.article = res.article
          }
        },
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this._auth.logOut();
              this._route.navigate(['/login']);
            }
          }
        }
      ) 
    }
    
}
