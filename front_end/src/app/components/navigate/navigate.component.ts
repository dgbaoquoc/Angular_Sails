import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  user = {
    id: '',
    email: '',
    role: ''
  }


  constructor(private _auth:AuthService,
              private _router:Router,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._auth.getCurrentUser()
    .subscribe(
      res => {
        if(res.status == 'success') {
          this.user = res.user
        }
      }
    )
  }
 
  checkLoggedUser() {
    if(this._auth.loggedIn()) {
      return true
    } else {
      return false
    }
  }
  
  logOutUser() {
    if(confirm("Do you want to logout?")) {
      this._auth.logOut();
      this._router.navigate(['/login']);
    }
  }

  test() {
    this._auth.testUrl()
    .subscribe(
      res => {
        // console.log(res)
        if(res.status == "error") {
          this._toastr.error(res.message)
        }
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
