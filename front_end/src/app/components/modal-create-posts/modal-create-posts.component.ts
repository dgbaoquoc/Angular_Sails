import { Component, OnInit } from '@angular/core';
import { CreatePostsService } from '../../services/create-posts.service';
import { SendDataService } from '../../services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-modal-create-posts',
  templateUrl: './modal-create-posts.component.html',
  styleUrls: ['./modal-create-posts.component.css']
})
export class ModalCreatePostsComponent implements OnInit {
  articleData={
    articlename: '',
    article: ''
  }
  constructor(private _createPostsService: CreatePostsService, private _dataService: SendDataService) { }

  ngOnInit(): void {

  }

  createArticle() {
    var self = this;
    this._createPostsService.postArticle(this.articleData).toPromise()
      .then(function(res) {
        self._dataService.sendToastr(res.status);
        console.log(res)
      })
      .catch(function(err) {
        console.log(err);
      })
  }
}
