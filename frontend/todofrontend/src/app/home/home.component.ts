import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userData: any

  constructor(public todo: TodoserviceService) {

  }
  ngOnInit() {
    this.todo.getUserList().subscribe((res) => {
      this.todo.setUserData(res.todos)
     
    })
   
  }
}
