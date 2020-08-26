import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  forgotUserData = {
    email: '',
    token: '',
    newPassword:'',
    confirmNewPassword:'',
  }

  constructor(private activatedRoute:ActivatedRoute,
    private _auth:AuthService,
    private _toastr: ToastrService,
    private _router: Router) { }

  ngOnInit() {
    // get param
    this.forgotUserData.email = this.activatedRoute.snapshot.queryParams["email"];
    this.forgotUserData.token = this.activatedRoute.snapshot.queryParams["token"];
  }

  submit() {
    if(this.forgotUserData.newPassword != this.forgotUserData.confirmNewPassword) {
      this._toastr.error('Password doesnt match.')
    } else {
      this._auth.submitNewPassword(this.forgotUserData)
      .subscribe(
        res => {
          if(res.status == 'success') {
            this._toastr.success(res.message)
            this._router.navigate(['/login'])
          } else {
            this._toastr.error(res.message)
          }
        }
      )
    }
  }
}
