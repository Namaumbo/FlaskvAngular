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
      this.doneList= this.todo.getUserData().filter(item=>{
        return item['completed'] == true
      })
  }

  handleDelete(id: string) {
    this.todo.deleteATodo(id).subscribe(res => {
      prompt('item successfully deleted')

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
    this.checkUndone()
  }
}
