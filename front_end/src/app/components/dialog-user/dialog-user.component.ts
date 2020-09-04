import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from'@angular/material/dialog'
import { Data } from '@angular/router';
import { AuthService} from '../../auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  dialogFirstName: string;
  dialogLastName: string;
  dialogRole:string;
  dialogEmail:string;
  dialogId:string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password:string;
    role:string;
  }

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('roleInput') roleInput: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private _authService: AuthService,
    private toastr: ToastrService
    ) { }

  updateUser() {
    this._authService.updateUser({
      user: {
        id: this.dialogId,
        email: this.emailInput.nativeElement.value,
        firstName: this.firstNameInput.nativeElement.value,
        lastName: this.lastNameInput.nativeElement.value,
        password: this.passwordInput.nativeElement.value,
        role: this.roleInput.nativeElement.value,    
      }
    })
      .subscribe(data => {
        if (data.status == "error") {
          this.toastr.error(data.message)
        } else if (data.status = "success") {
          this.toastr.success(data.message)
          this.dialogRef.close()
        }
        
      })
  }

  ngOnInit(): void {
    this.dialogFirstName = this.data.dialogUser.first_name;
    this.dialogLastName = this.data.dialogUser.last_name;
    this.dialogRole = this.data.dialogUser.role;
    this.dialogEmail = this.data.dialogUser.email;
    this.dialogId = this.data.dialogUser.id
  }


}
