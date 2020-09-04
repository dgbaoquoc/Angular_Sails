import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Article } from '../../models/Article';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';


declare var $:any

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {
    ELEMENT_DATA: Article[];
    displayedColumns:string[] = ['id', 'title', 'author', 'date', 'actions'];
    dataSource = new MatTableDataSource<Article>(this.ELEMENT_DATA)

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllArticles();  
  }

    getAllArticles(){
    let resp = this._AuthService.getArticle();
    resp.subscribe(report => this.dataSource.data=report as Article[])
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
