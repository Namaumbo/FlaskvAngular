import { Component } from '@angular/core';
import { TodoserviceService } from '../../services/todo/todoservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userData: any
  public todoTitle: string = ''
  public noItem: string = ''
  public todoDescription = ''


  constructor(public todo: TodoserviceService) {

  }

  ngOnInit() {
    this.todo.getUserList()
  }

  checkEnter() {
    this.handleAddTodo()
  }
  //statistics update

  handleAddTodo() {

    if (this.todoTitle.length == 0) {
      alert(' Title field is empty')
      return
    }
    if (this.todoDescription.length == 0) {
      alert('Description field is empty')
      return
    }

    this.todo.addTodoToUser(this.todoTitle, this.todoDescription)
    this.todoTitle = ''
    this.todoDescription = ''
  }

}
