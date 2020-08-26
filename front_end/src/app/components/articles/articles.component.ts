import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  @Input() article:any;

  constructor() { }
  
  ngOnInit():void {}
    

}
