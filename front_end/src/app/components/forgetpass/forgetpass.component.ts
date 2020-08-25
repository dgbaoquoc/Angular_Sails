import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  forgotUserData={
    email: '',
  }


  constructor(private _auth:AuthService,
    private _toastr: ToastrService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this._auth.forgotPassword(this.forgotUserData)
    .subscribe(
      res => {
        if(res.status == 'success') {
          this._toastr.success(res.message)
        } else {
          this._toastr.error(res.message)
        }
      },
    )
  }
}
