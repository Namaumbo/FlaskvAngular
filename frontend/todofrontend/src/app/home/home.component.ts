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
  noItem : string = ''
  condition = true


  constructor(public todo: TodoserviceService) {

  }

  handleAddTodo(){
   
    this.todo.addTodoToUser(this.todoTitle).subscribe(res=>{
      alert('successfully added')
      this.todo.setUserData(res.item)
      this.condition = false
    })
  }
  handleDelete(id : string ){
   this.todo.deleteATodo(id).subscribe(res=>{
    alert('item successfully deleted')
   
    // if((res.item).length == 0){
    //   this.condition = true
    // }
    console.log(res.item)
    this.todo.setUserData(res.item)
   })
  }
  handleComplete(id:string){
    this.todo.completeAToDo(id).subscribe(res=>{
    this.todo.setUserData(res.item)
    })
  }
  ngOnInit() {
    this.todo.getUserList().subscribe( {
      next:res =>{
        this.todo.setUserData(res.todos)
      },
      error: err =>{
        this.noItem = err.error.message
      }
     
     
    })
   
  }

}
