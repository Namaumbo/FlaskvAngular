import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {


  public todoTitle = "";
  public todoDescription = "";
  public condition = true;
  constructor(public HttpClient: HttpService) { }

  userData: any = [];
  doneList: any = [];

  public done_count = 0
  public todo_count = 0


  setUserData(data: any) {
    this.userData = data
    this.userData.forEach((e: any) => {
      if (e['completed']) {
        this.done_count += 1
      } else {
        this.todo_count += 1
      }
    });
  }


  checkUndone() {
    this.doneList = this.userData.filter((item: any) => {
      return item['completed'] == true
    })
  }


  getUserList() {
    this.HttpClient.get('get_user_list').subscribe((resp: any) => {
      if (resp.todos.length == 0) {
        this.setUserData(resp.todos)
        this.checkUndone()
      }
      this.setUserData(resp.todos)
      this.checkUndone()

    })
  }


  addTodoToUser(title: string, description: string) {

    let body = {
      "title": title,
      "description": description
    }

    return this.HttpClient.post('add-todo', body).subscribe(res => {
      alert('successfully added')
      this.getUserList()
      this.todoTitle = ''
      this.todoDescription = ''
      this.condition = false
    })
  }

  public deleteTodo(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.HttpClient.delete(`/delete-todo/${id}`).subscribe((resp: any) => {
        if (resp.todos.length == 0) {
          this.condition = true
          this.setUserData(resp.todos)
        } else {
          this.setUserData(resp.todos)
        }
      })
    }
  }

  // completeAToDo(id: string) {
  //   let apiUrl = `${this.urlPrefix}/complete-todo/${id}`
  //   const token = localStorage.getItem('token')
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.HttpClient.put<any>(apiUrl, '', { headers: headers })
  // }

  // uncompleteAToDo(id: string) {

  //   let apiUrl = `${this.urlPrefix}/undo-todo/${id}`
  //   const token = localStorage.getItem('token')
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.HttpClient.put<any>(apiUrl, '', { headers: headers })
  // }

  // showItem(id: string) {
  //   let apiUrl = `${this.urlPrefix}/show-item/${id}`
  //   const token = localStorage.getItem('token')
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.HttpClient.get<any>(apiUrl, { headers: headers })



  // }
}
