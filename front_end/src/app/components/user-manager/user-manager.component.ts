import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User'
import { AuthService} from '../../auth.service'
declare  var $:  any;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
   user: User[];

  constructor(private _AuthService: AuthService) { 
  }

    clickFunction() {
        $("#userModal").modal("show")
    }
    updateUser() {
        alert("hello world");
    } 


  ngOnInit() {
    $(document).ready(function() {
      $('#example').DataTable( {
          "processing": true,
          "serverSide": true,
          "ajax": {
              "order": [[ 0, 'ASC' ]],
              "url":"http://localhost:1337/getuser",
              "type":"GET",
              "cache":true,
              "complete":function(xhr, stt ) {
                  console.log(xhr.responseText);
                  console.log(status)
              },
          },
          columns:  [
              {   name: "id",
          },
              {   name: "email",
          },
              {   name: "first_name",
          },
              {   name: "last_name",
          },
              {   name: null,"orderable": false,
          },
          ],
      } );

     function editUser(exp) {
        alert("hello tuan")
    }
  });

//   $(document).on("click", ".edituser", function(id) {
//     ajax({
//         type: "POST",
//         dataType: "json",
//         url:"http://localhost:1337/edituser",
//         data:{
//             id:id,
//         },
//         success:function(data) {
//              var user = data.user
//             $("#myName").val(user.name)
//             $("#myRole").val(user.role)
//             $("#myStatus").val(user.status)
//             $("#myId").val(user.id)
//             if ( user.role == "Admin") {
//                 $('#userRole').css('display','none');
//                 $('#userStatus').css('display','none');
//             } else {
//                 $('#userRole').css('display','block');
//                 $('#userStatus').css('display','block');
//             }

//         },
//     })
//     $("#userModal").modal("show")
//   })
  }

}
