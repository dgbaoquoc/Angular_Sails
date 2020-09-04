import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ArticlesPostService } from 'src/app/services/articles-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-homepage',
  templateUrl: './body-homepage.component.html',
  styleUrls: ['./body-homepage.component.css']
})
export class BodyHomepageComponent implements OnInit {

  constructor(private _auth:AuthService,
    private _router:Router, private _articlesPostService: ArticlesPostService) { }

  ngOnInit(): void {
    
  }




}
