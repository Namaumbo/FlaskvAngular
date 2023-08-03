import { Component,OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user/user.service';
import { filter } from 'rxjs';

export interface todoInterface {
 title:string,
 id : number,
 description : string 
 userId : number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    public user: UserService,
  ) {

  }
  ngOnInit() {
<<<<<<< HEAD
    this.todo.getTodoList()
=======
>>>>>>> ea19e3668a5af265df57670c4d9b5f29c5e284d8
  }

 
}
