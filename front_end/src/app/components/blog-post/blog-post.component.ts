import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../../services/send-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ArticlesPostService } from 'src/app/services/articles-post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  public postObject;
  subscription: Subscription;
  constructor(private _dataService: SendDataService, private route: ActivatedRoute, private _articlesPostService: ArticlesPostService) { }

  ngOnInit(): void {
    var self = this;
    let idArticle = this.route.snapshot.paramMap.get('id');
    var idData = {
      idPost: idArticle
    }
    this.subscription = self._articlesPostService.getPostBlog(idData)
      .subscribe(function(data) {
        self.postObject = data.post;
      })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
