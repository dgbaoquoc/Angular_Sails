import { Component } from '@angular/core';
import { Title, Meta} from '@angular/platform-browser';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "";

  constructor(private titleService: Title, private meta: Meta, private _auth:AuthService) {
    titleService.setTitle("Blog Post - Start Bootstrap Template");
    meta.addTag({name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"});
  }

  checkLoggedUser() {
    if(this._auth.loggedIn()) {
      return true
    } else {
      return false
    }
  }
}
