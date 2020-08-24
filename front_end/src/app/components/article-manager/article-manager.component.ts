import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Article } from '../../models/Article'

declare var $:any

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {
  article: Article[];

  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    $ (document).ready( function() {
      $('#example').DataTable( {
          "processing": true,
          "serverSide": true,
          "ajax": {
              "order": [[ 0, 'ASC' ]],
              "url":"http://localhost:1337/getarticle",
              "type":"GET",
              "cache":true,
              "complete":function(xhr, stt ) {
                  console.log(xhr.responseText);
                  console.log(status)
              },
          },
          columns:  [
              {    name: "id",
                  render:$.fn.dataTable.render.text()
          },
              {   name: "title",
                  render:$.fn.dataTable.render.text()
          },
              {   name: "author",
                  render:$.fn.dataTable.render.text()
          },
              {   name: "date",
                  render:$.fn.dataTable.render.text()
          },
              { name: null, "orderable":false },
          ],
      })
  })
  }

}
