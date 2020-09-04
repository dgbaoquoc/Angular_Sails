import { Component, OnInit} from '@angular/core';
import { SendDataService } from '../../services/send-data.service';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.css']
})
export class ModalEditUserComponent implements OnInit {

  header1: any
  header2: any

  data: any;
  constructor(private sendDataService: SendDataService, private auth: AuthService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var self = this;
    var test = this.route.snapshot.url[0].path;
    if(test == "articleManager") {
      self.header1 = "Edit Your Article";
      self.header2 = "Article Name";
      this.sendDataService.valueFrom.subscribe(function(data){
        self.data = data;
      })
    }
    else {
      self.header1 = "Edit Your User";
      self.header2 = "Email";
      this.sendDataService.valueFromUser.subscribe(function(data) {
        self.data = data;
      })
    }
  }

  checkArticle() {
    var self = this;
    var test = this.route.snapshot.url[0].path;
    if(test == "articleManager") {
      return true;
    }
    return false;
  }

  checkUser() {
    var self = this;
    var test = this.route.snapshot.url[0].path;
    if(test == "userManager") {
      return true;
    }
    return false;
  }

  saveArticle(id: any) {
    var self = this;
    this.auth.saveArticle({id: self.data.id, articlename: self.data.articlename, article: self.data.article})
      .subscribe(function(data) {
        if(data.status == "success") {
          window.location.reload();
          self.toastr.success(data.message)
        }
        else if(data.status == "fail") {
          self.toastr.error(data.message)
        }
      })
  }

  saveUser(id: any) {
    var self = this;
    console.log(self.data.role)
    // this.auth.saveUser({id: self.data.id, email: self.data.email, article: self.data.role})
    //   .subscribe(function(data) {
    //     if(data.status == "success") {
    //       window.location.reload();
    //       self.toastr.success(data.message)
    //     }
    //     else if(data.status == "fail") {
    //       self.toastr.error(data.message)
    //     }
    //   })

  }

}
