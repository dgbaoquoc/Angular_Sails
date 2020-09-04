import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  public infor = {
    email: "",
    role: ""
  }
  constructor(private _auth:AuthService,
              private _router:Router,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    var x = localStorage.getItem('token');
    this.infor.email = jwt_decode(x).email;
    this.infor.role = jwt_decode(x).role;
  }

  checkRoleUser() {
    var x = localStorage.getItem('token');
    if(jwt_decode(x).role == "admin") {
      return true;
    }
    return false;
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
    )
  }
}
