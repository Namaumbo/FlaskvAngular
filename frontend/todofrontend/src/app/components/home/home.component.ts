import { Component, OnInit,  Inject} from '@angular/core';
import { TodoserviceService } from '../../services/todo/todoservice.service';

export interface todo {
  userId: number,
  id: number,
  title: string,
  description: string


}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  displayedColumns: string[] = ['title', 'actions'];
  public todoTitle: string = ''
  public noItem: string = ''
  public todoDescription = ''
  public searchValue: string = ''
  public data : any  =  []

  constructor(public todo: TodoserviceService) {
  }
  ngOnInit() {
    this.todo.getTodoList()
    
  }

  checkEnter() {
    this.handleAddTodo()
  }


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
