import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  urlPrefix = 'http://127.0.0.1:5000/api/v1'
  constructor(public HttpClient: HttpClient) { }

  userData = [];


  setUserData(data: any) {
    this.userData = data
  }
  getUserData() {
    return this.userData
  }
  getUserList() {
    let userList = `${this.urlPrefix}/get_user_list`

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.HttpClient.get<any>(userList, { headers: headers })
  }
  addTodoToUser(title: string) {
    let apiUrl = `${this.urlPrefix}/add-todo`
    const token = localStorage.getItem('token')
    let body = {
      "title": title
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.HttpClient.post<any>(apiUrl, body, { headers: headers })
  }

  deleteATodo(id: string ) {
    let apiUrl = `${this.urlPrefix}/delete-todo/${id}`
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.HttpClient.delete<any>(apiUrl, { headers: headers })
  }

  completeAToDo(id: string) {
    let apiUrl = `${this.urlPrefix}/complete-todo/${id}`
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.HttpClient.put<any>(apiUrl, '', { headers: headers })


  }
}