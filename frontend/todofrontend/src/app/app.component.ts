import { Component,OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user/user.service';
import { filter } from 'rxjs';
import { TodoserviceService } from './services/todo/todoservice.service';

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
    public todo: TodoserviceService

  ) {

  }
  ngOnInit() {
    this.todo.getTodoList()
  }

 
}
