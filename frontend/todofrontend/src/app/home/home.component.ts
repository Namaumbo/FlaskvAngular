import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userData: any
  todoTitle: string = ''
  noItem: string = ''
  condition = true
  todoDescription = ''
  undoList = []
  doneList = []


  constructor(public todo: TodoserviceService) {

  }

  checkEnter() {
    this.handleAddTodo()
  }
  //statistics update
  statistics() {
    this.undoList = this.todo.getUserData().filter((item: any) => {
      return item['completed'] == false
    })
    this.doneList = this.todo.getUserData().filter((item: any) => {
      return item['completed'] == true
    })
  }

  // text maximum check
  checkMax() {
    if (this.todoTitle.length >= 100) {
      alert('maximum input reached')
    }
  }

  checkDescMax() {
    if (this.todoDescription.length >= 200) {
      alert('maximum input reached')
    }
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

    this.todo.addTodoToUser(this.todoTitle, this.todoDescription).subscribe(res => {
      alert('successfully added')
      this.todo.getUserList().subscribe(responce => {
        this.todo.setUserData(responce.todos)
        this.statistics()
      })

      this.todoTitle = ''
      this.todoDescription = ''
      this.condition = false
    })
  }
  handleDelete(id: string) {

    let choice = confirm("Are you sure you want to delete this item?")
    if (choice){
      this.todo.deleteATodo(id).subscribe(res => {
        alert('item successfully deleted')
        // console.log(res)
        this.todo.getUserList().subscribe(resp => {
          if (resp.todos.length == 0) {
            this.condition = true
            this.todo.setUserData(resp.todos)
            this.statistics()
          } else {
            this.todo.setUserData(resp.todos)
            this.statistics()
  
          }
        })
  
      })
    }
    return


  }
  handleComplete(id: string) {
    this.todo.completeAToDo(id).subscribe(res => {
      this.todo.getUserList().subscribe(response => {

        this.todo.setUserData(response.todos)

        this.undoList = this.todo.getUserData().filter((item: any) => {
          return item['completed'] == false
        })
        this.doneList = this.todo.getUserData().filter((item: any) => {
          return item['completed'] == true
        })

      })
    })
  }


  handleUndo(id: string) {
    this.todo.uncompleteAToDo(id).subscribe(res => {
      this.todo.getUserList().subscribe(resp => {

        if (resp.todos.length == 0) {
          this.todo.setUserData(resp.todos)
          this.statistics()


        } else {
          this.todo.setUserData(resp.todos)
          this.statistics()

        }

      })
    })
  }
  handleShow(id: string) {
    this.todo.showItem(id).subscribe(res => {
      this.todoDescription = res.item.description
    })

  }
  ngOnInit() {
    this.todo.getUserList().subscribe({

      next: res => {

        if (res.todos.length == 0) {
          this.condition = true
          this.noItem = res.message
        }
        this.todo.setUserData(res.todos)

        this.statistics()
      },
      error: err => {
        this.noItem = err.error.message
      }
    })

  }

}
