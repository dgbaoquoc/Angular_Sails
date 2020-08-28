import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit,  ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';


/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-article-manager-test',
  templateUrl: './article-manager-test.component.html',
  styleUrls: ['./article-manager-test.component.css']
})
export class ArticleManagerTestComponent implements AfterViewInit {
  displayedColumns = ['articlename', 'article', 'author', 'dateCreated'];
  exampleDatabase: ExampleHttpDatabase | null;
  public dataArr = [];
  searchValue = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;



  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.searchValue = this.searchValue ? this.searchValue : "";
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup').subscribe(() => this.paginator.pageIndex = 0);
    
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
      ).subscribe(function(data) {
        this.dataArr = data;
        console.log(this.dataArr);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue.trim().toLowerCase();
  }
}

// export interface GithubApi {
//   items:  GithubIssue[];
//   total_count: number;
// }

// export interface GithubIssue {
//   article: string;
//   articlename: string;
//   author: string;
//   dateCreated: string;
//   id: string;
//   updatedAt: string;
// }


export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: any, order: any, page: any, limit: any, search: any): Observable<any> {
    const href = 'http://localhost:1337/test123';
    const requestUrl =
    `${href}?sort=${sort}&order=${order}&page=${page + 1}&limit=${limit}&search=${search}`;

    return this._httpClient.get<any>(requestUrl);
  }
}
