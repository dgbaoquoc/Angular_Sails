import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { AuthService} from '../../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from'@angular/material/dialog'

declare  var $:  any;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
    ELEMENT_DATA: User[];
    displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'actions'];
    dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA)

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatDialog, {static: true}) dialog: MatDialog;
    
    constructor(private _AuthService: AuthService) { 
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllReports();  
    }

    getAllReports(){
        let resp = this._AuthService.getUser();
        resp.subscribe(report => this.dataSource.data=report as User[])
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getUser(userId) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url:"http://localhost:1337/edituser",
            data:{
                id:userId,
            },
            success:function(data) {
                //  var user = data.user
                // $("#myName").val(user.name)
                // $("#myRole").val(user.role)
                // $("#myStatus").val(user.status)
                // $("#myId").val(user.id)
                // if ( user.role == "Admin") {
                //     $('#userRole').css('display','none');
                //     $('#userStatus').css('display','none');
                // } else {
                //     $('#userRole').css('display','block');
                //     $('#userStatus').css('display','block');
                // }
                console.log(data)

            },
        })
        $("#userModal").modal("show")
    }
}
