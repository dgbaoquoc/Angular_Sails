import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registerUserData={
    email: '',
    password: ''
  }


  constructor(private _auth:AuthService,
              private _toastr: ToastrService,
              private _router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['homepage']);
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;
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
