import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit,  ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SendDataService } from '../../services/send-data.service'

@Component({
  selector: 'app-user-manager-test',
  templateUrl: './user-manager-test.component.html',
  styleUrls: ['./user-manager-test.component.css']
})
export class UserManagerTestComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'role', 'tools'];
  exampleDatabase: ExampleHttpDatabase | null;
  dataArr: [];
  searchValue = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;



  constructor(private _httpClient: HttpClient, private router: Router, private authService: AuthService, private toastr: ToastrService, private sendDataService: SendDataService) {}

  ngAfterViewInit() {
    var self = this;
    this.searchValue = this.searchValue ? this.searchValue : "";
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup').subscribe(function() {self.paginator.pageIndex = 0});

    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.input.nativeElement, 'keyup'))
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.searchValue);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          if(data.status != "success") {
            self.authService.logOut();
            return self.router.navigate(['/login']);
          }
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.items;

        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.dataArr = data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue.trim().toLowerCase();
  }

  deletePost(id: any) {
    var self = this;
    if(confirm("Do you want to delete this user?")) {
      this.authService.deleteUser({id: id})
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
  }

  edit(id: any) {
    var self = this;
    this.authService.editUser({id: id})
      .subscribe(function(data) {
        if(data.status = "success") {
          self.sendDataService.sendDataUser(data.data);
        }
      })
  }

}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: any, order: any, page: any, limit: any, search: any): Observable<any> {
    const href = 'http://localhost:1337/test456';
    const requestUrl =
    `${href}?sort=${sort}&order=${order}&page=${page + 1}&limit=${limit}&search=${search}`;

    return this._httpClient.get<any>(requestUrl);
  }
}
