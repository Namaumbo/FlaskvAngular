import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';

@Component({
  selector: 'app-uncomplete',
  templateUrl: './uncomplete.component.html',
  styleUrls: ['./uncomplete.component.scss']
})
export class UncompleteComponent {

  unDoneList = []


  
  checkUndone(){
    this.unDoneList= this.todo.getUserData().filter(item=>{

      return item['completed'] == false
    })
}

  handleDelete(id : string ){
    this.todo.deleteATodo(id).subscribe(res=>{
     alert('item successfully deleted')
     // console.log(res)
     this.todo.getUserList().subscribe(resp=>{
       console.log(resp)
       if(resp.todos.length == 0 ){
         
         this.todo.setUserData(resp.todos)
         this.checkUndone()
 
       }else{
         this.todo.setUserData(resp.todos)
         this.checkUndone()
 
       }
      })  
 
    })
    
   }
   handleComplete(id:string){
    this.todo.completeAToDo(id).subscribe(res=>{
      this.todo.getUserList().subscribe(response=>{
        this.todo.setUserData(response.todos)
        this.checkUndone()
      })
    })
  }
  constructor(public todo : TodoserviceService){}

ngOnInit(){
  this.checkUndone()
}
}
