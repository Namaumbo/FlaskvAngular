import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';

@Component({
  selector: 'app-completelist',
  templateUrl: './completelist.component.html',
  styleUrls: ['./completelist.component.scss']
})
export class CompletelistComponent {

  doneList = []
  // checker

  checkUndone(){
      this.doneList= this.todo.getUserData().filter((item: any)=>{
        return item['completed'] == true
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
            this.todo.setUserData(resp.todos)
            this.checkUndone()
          } 
            this.todo.setUserData(resp.todos)
            this.checkUndone()
  
        })
  
      })
    }
    return


  }

  handleUndo(id: string) {
    
    this.todo.uncompleteAToDo(id).subscribe(res => {
      this.todo.getUserList().subscribe(resp => {
        if (resp.todos.length == 0) {
          this.todo.setUserData(resp.todos)
          this.checkUndone()
        } else {
          this.todo.setUserData(resp.todos)
          this.checkUndone()
        }
      })
    })


  }
  constructor(public todo: TodoserviceService) {

  }

  ngOnInit() {
    this.todo.getUserList().subscribe({
      next: res => {
        this.todo.setUserData(res.todos)
        this.checkUndone()
      },
      error: err => {
      }
    })
  
  }
}
