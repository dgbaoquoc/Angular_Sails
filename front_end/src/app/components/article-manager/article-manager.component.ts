import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'


@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {
  articles: Article[];

  constructor() { 
  }

  ngOnInit() {
    this.articles = [
      {
        id: 1,
        title: 'chung ta da truong thanh nhu the day',
        author: 'tuan',
        date: new Date("Fri Dec 08 2019 07:44:57"),
        description: 'blabloe',
        content: 'luclasdnjasdnkj'
      },
      {
        id: 2,
        title: 'chung ta da truong thanh nhu the day',
        author: 'tuan',
        date: new Date("Fri Dec 08 2019 07:44:57"),
        description: 'blabloe',
        content: 'luclasdnjasdnkj'
      },
      {
        id: 3,
        title: 'chung ta da truong thanh nhu the day',
        author: 'tuan',
        date: new Date("Fri Dec 08 2019 07:44:57"),
        description: 'blabloe',
        content: 'luclasdnjasdnkj'
      },
    ]

  }

}
