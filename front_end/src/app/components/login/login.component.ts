import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  
  // loginUserData = {
  //   email: '',
  //   password: ''
  // }

  constructor(private _auth:AuthService,
              private _router:Router,
              private _toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/homepage']);
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
    });
  }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this._auth.loginUser(this.registerForm.value)
        .subscribe(
          res => {
            if (res.status == 'success') {
              localStorage.setItem('token', res.token)
              this._toastr.success("Login successfully")
              this._router.navigate(['/homepage'])
            } else {
              this._toastr.error(res.message)
            }
          },
        )
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

  // loginUser() {
  //   this._auth.loginUser(this.loginUserData)
  //   .subscribe(
  //     res => {
  //       if(res.status == 'success') {
  //         localStorage.setItem('token', res.token)
  //         this._toastr.success("Login successfully")
  //         this._router.navigate(['/home'])
  //       } else {
  //         this._toastr.error(res.message)
  //       }
  //     },
  //   )
  // }
}
