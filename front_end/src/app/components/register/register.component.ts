import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData={
    email: '',
    password: ''
  }


  constructor(private _auth:AuthService,
              private _toastr: ToastrService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        if(res.status == 'success') {
          this._toastr.success(res.message)
          this._router.navigate(['/login']);
        } else {
          this._toastr.error(res.message)
        }
      },
    )
  }

}
