import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  }

  constructor(private _auth:AuthService,
              private _router:Router,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['home']);
    }
  }
  
  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        if(res.status == 'success') {
          localStorage.setItem('token', res.token)
          this._toastr.success("Login successfully")
          this._router.navigate(['/home'])
          // this._auth.testUrl().subscribe(response => {
          //   console.log(response)
          // })
        } else {
          this._toastr.error(res.message)
        }
      },
    )
  }
}
