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
    // this.todoTitle = ''
    // this.noItem = ''
    // todoDescription = ''
  }


  // handleComplete(id: string) {
  //   this.todo.completeAToDo(id).subscribe(res => {
  //     this.todo.getUserList().subscribe(response => {

  //       this.todo.setUserData(response.todos)

  //       this.undoList = this.todo.getUserData().filter((item: any) => {
  //         return item['completed'] == false
  //       })
  //       this.doneList = this.todo.getUserData().filter((item: any) => {
  //         return item['completed'] == true
  //       })

  //     })
  //   })
  // }


  // handleUndo(id: string) {
  //   this.todo.uncompleteAToDo(id).subscribe(res => {
  //     this.todo.getUserList().subscribe(resp => {

  //       if (resp.todos.length == 0) {
  //         this.todo.setUserData(resp.todos)
  //         this.statistics()


  //       } else {
  //         this.todo.setUserData(resp.todos)
  //         this.statistics()

  //       }

  //     })
  //   })
  // }
  // handleShow(id: string) {
  //   this.todo.showItem(id).subscribe(res => {
  //     this.todoDescription = res.item.description
  //   })

  // }


}
