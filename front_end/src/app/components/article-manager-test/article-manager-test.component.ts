import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
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
  displayedColumns: string[] = ['articlename', 'article', 'author', 'dateCreated'];
  exampleDatabase: ExampleHttpDatabase | null;
  dataArr: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
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
        // this.dataArr.sort = this.sort;
        // this.dataArr.paginator = this.paginator;
      });
  }
}

export interface GithubApi {
  items:  GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  articlename: string;
  article: string;
  author: string;
  dateCreated: string;
}


export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'http://localhost:1337/test123';
    const requestUrl =
    `${href}?sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
