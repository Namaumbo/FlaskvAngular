import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { MatTableDataSource } from '@angular/material/table';


export interface todo {
  userId: number,
  id: number,
  title: string,
  description: string

}
@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {


  public todoTitle = "";
  public todoDescription = "";
  public condition = true;
  totalpages: number = 0
  userData: any = [];
  public done_count = 0
  public todo_count = 0
  public undoList = []
  public doneList = []
  public dataSource: any
  limit = 50
  page = 1


  constructor(public HttpClient: HttpService) { }

  setUserData(data: any) {
    // this.userData = []
    console.log('setUserData=> ',data)
    // this.userData = data.reverse()
    this.userData = data
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
  addTodoToUser(title: string, description: string) {

    let body = {
      "title": title,
      "description": description
    }
    return this.HttpClient.post('add-todo', body).subscribe((res: any) => {
      alert('successfully added')
      this.setUserData(res.items)
      this.getUserList()
      this.statistics()

      // this.condition = false
    })
  }

  getUserList() {
    console.log('getUserList this.page', this.page)
    // this.userData = []
    this.HttpClient.get('get-todo', this.limit, this.page).subscribe((resp: any) => {
      if (resp.items.length == 0) {
        this.setUserData(resp.todos)
        this.checkUndone()
        this.statistics()
      }
      this.setUserData(resp.items)
      this.page = resp.pagination.page
      this.totalpages = resp.pagination.totalPages
      this.checkUndone()
      this.statistics()
      // console.log(resp)
    })
  }

  handlenext = async () => {

    console.log(this.page)
    this.page = this.page + 1
    this.getUserList()
  }


  handleprevious(): any {
    console.log( 'handleprevious=> ', this.page)
    this.page = this.page - 1
    console.log( 'handleprevious sub=> ', this.page)
    this.getUserList()
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
    this.HttpClient.update(`complete-todo/${id}`, '').subscribe((resp: any) => {
      this.setUserData(resp.items)
      this.getUserList()
      this.statistics()
    })
  }

  undoTodo(id: string) {

    this.HttpClient.update(`undo-todo/${id}`, '').subscribe((resp: any) => {
      this.setUserData(resp.items)
      this.getUserList()
      this.statistics()

    })
  }


}
