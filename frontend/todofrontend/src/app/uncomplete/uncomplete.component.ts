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
    this.unDoneList= this.todo.getUserData().filter((item: any)=>{
      return item['completed'] == false
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
  // handleDelete(id : string ){
  //   this.todo.deleteATodo(id).subscribe(res=>{
  //    alert('item successfully deleted')
  //    // console.log(res)
  //    this.todo.getUserList().subscribe(resp=>{
  //      console.log(resp)
  //      if(resp.todos.length == 0 ){
         
  //        this.todo.setUserData(resp.todos)
  //        this.checkUndone()
 
  //      }
  //        this.todo.setUserData(resp.todos)
  //        this.checkUndone()
 
       
  //     })  
 
  //   })
    
  //  }
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
