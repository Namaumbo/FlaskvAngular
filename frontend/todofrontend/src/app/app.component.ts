import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { TodoserviceService } from './services/todo/todoservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  constructor (
    public user : UserService,
    public todo : TodoserviceService
    ){

  }
  ngOnInit(){
    this.todo.getUserList()
  }
}
