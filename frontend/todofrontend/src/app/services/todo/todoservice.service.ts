import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {


  public todoTitle = "";
  public todoDescription = "";
  public condition = true;



  constructor(public HttpClient: HttpService) { }

  userData: any = [];
 

  public done_count = 0
  public todo_count = 0
  public undoList =  []
  public doneList = []


  setUserData(data: any) {
    this.userData = data.reverse()
  }

  statistics() {
    this.undoList = this.userData.filter((item: any) => {
      return item['completed'] == false
    })
    this.doneList = this.userData.filter((item: any) => {
      return item['completed'] == true
    })
  }

  checkUndone() {
    this.doneList = this.userData.filter((item: any) => {
      return item['completed'] == true
    })
  }

loadData(){
  return this.HttpClient.get('get-todo');
}
  getUserList() {
    this.HttpClient.get('get-todo').subscribe((resp: any) => {
      if (resp.items.length == 0) {
        this.setUserData(resp.todos)
        this.checkUndone()
        this.statistics()
      }
      this.setUserData(resp.items)
      this.checkUndone()
      this.statistics()
    })
  }




  addTodoToUser(title: string, description: string) {

    let body = {
      "title": title,
      "description": description
    }
    return this.HttpClient.post('add-todo', body).subscribe((res : any) => {
      alert('successfully added')
      this.setUserData(res.items)
      this.getUserList()
      this.statistics()
 
      // this.condition = false
    })
  }

  public deleteTodo(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.HttpClient.delete(`delete-todo/${id}`).subscribe((resp: any) => {
        
        if (resp.items.length == 0) {
          this.condition = true
          this.setUserData(resp.items)
          this.getUserList()
          this.statistics()
        } else {
          this.setUserData(resp.items)
          this.getUserList()
          this.statistics()
        }
      })
    }
  }

  completeToDo(id: string) {
    this.HttpClient.update(`complete-todo/${id}`,'').subscribe((resp:any) =>
    {
      this.setUserData(resp.items)
      this.getUserList()
      this.statistics()
    })
  }

  undoTodo(id: string) {

    this.HttpClient.update(`undo-todo/${id}`,'').subscribe((resp:any) =>{
      this.setUserData(resp.items)
      this.getUserList()
      this.statistics()

    })
  }

  nextchunch(){

  }
  previouschunch(){

  }


  
}