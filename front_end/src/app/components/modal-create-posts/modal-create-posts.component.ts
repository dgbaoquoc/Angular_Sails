import { Component, OnInit } from '@angular/core';
import { CreatePostsService } from '../../services/create-posts.service';
import { SendDataService } from '../../services/send-data.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-modal-create-posts',
  templateUrl: './modal-create-posts.component.html',
  styleUrls: ['./modal-create-posts.component.css']
})
export class ModalCreatePostsComponent implements OnInit {
  articleData={
    articlename: '',
    article: '',
  }
  constructor(private _createPostsService: CreatePostsService, private _dataService: SendDataService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  createArticle() {
    var self = this;
    this._createPostsService.postArticle(this.articleData).toPromise()
      .then(function(res) {
        console.log(res.status)
        if(res.status == "success") {
          self.refresh();
          self.toastr.success('Created article successfully');

        }
        else if(res.status == "fail") {
          self.toastr.error('Created failed!')
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  refresh(): void {
    window.location.reload();
  }

}
