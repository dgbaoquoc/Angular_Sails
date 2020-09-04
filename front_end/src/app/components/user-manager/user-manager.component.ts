import {HttpClient} from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/User';
import { AuthService} from '../../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap,} from 'rxjs/operators';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog'
import { DialogUserComponent } from '../dialog-user/dialog-user.component';



declare  var $:  any;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'role', 'first_name', 'last_name', 'actions'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) input: MatInput
  @ViewChild('toTarget') toTarget: ElementRef
  
  constructor(private _httpClient: HttpClient, private _authService: AuthService, private toastr: ToastrService, private dialog: MatDialog) {}

  deleteUser(id) {
    if(confirm("Do you want to delete this user ?")) {
      this._authService.deleteUser({id: id})
        .subscribe(data =>{
          if (data.status == "success") {
            this.toastr.success(data.message)
          }
        })
    }
  }

  applyFilter (filterValue: string) {
    this.exampleDatabase.filter = filterValue.trim().toLowerCase()
  }

  openDialog(dataUser) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '500px',
      height: '400px',
      data: {
        dialogUser: dataUser
      }
    });
  }

  refresh() {
    this.exampleDatabase.getRepoIssues().subscribe(res => {
      
    })
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    
    const keyup = fromEvent( this.toTarget.nativeElement, 'keyup')
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    keyup.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.sort.sortChange, this.paginator.page, keyup )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.input.value);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data
      });
  }

  
}

export interface GithubApi {
    items: User[];
    total_count: number;
  }
  
  /** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
    filter: string;
    constructor(private _httpClient: HttpClient) {}
  
    getRepoIssues(sort: string, order: string, page: number, pageSize: number, value:string): Observable<GithubApi> {
      const href = 'http://localhost:1337/getuser';
      const requestUrl =
          `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}&pageSize=${pageSize}&filter=${value}`;
  
      return this._httpClient.get<GithubApi>(requestUrl);
    }
} 
