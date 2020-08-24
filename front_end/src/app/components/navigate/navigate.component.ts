import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor(private _auth:AuthService,
    private _router:Router) { }

  ngOnInit(): void {
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
        console.log(res)
      },
    )
  }
}
