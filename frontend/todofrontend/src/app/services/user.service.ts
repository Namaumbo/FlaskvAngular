import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //  
  urlPrefix = 'http://192.168.0.182:5000/api/v1'
  // urlPrefix = 'http://127.0.0.1:5000/api/v1'


  public userResObject: any = {}



  userName = ''
  constructor(private HttpClient: HttpClient, public router: Router) {
  }

  // getUserName() {
  //   return this.userName;
  // }
  // setUserName(username: string) {
  //   this.userName = username
  // }
  

  userLogin(userDetails: any) {
    let userAuth = `${this.urlPrefix}/login`
    this.userResObject = {}
    return this.HttpClient.post<any>(userAuth, userDetails).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token)
        this.router.navigate(['/home'])

      })
    )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token)
      return true
    else
      return false
  }

  isLoggedOut(): boolean {
    localStorage.setItem('token', '');
    return false
  }

}
