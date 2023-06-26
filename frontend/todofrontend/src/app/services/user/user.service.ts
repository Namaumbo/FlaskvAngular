import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //  
  // urlPrefix = 'http://192.168.0.182:5000/api/v1'
  urlPrefix = 'http://127.0.0.1:3000/api/v1'

  
  public  errorMessage = ''
  public username = ''

  constructor(private HttpClient: HttpClient, public router: Router) {
  }


  userLogin(userDetails: any) {
    let userAuth = `${this.urlPrefix}/login`
    this.HttpClient.post<any>(userAuth, userDetails).subscribe({
      next : response  => {
      this.username = response['user']['username']
      localStorage.setItem('username',this.username)
      localStorage.setItem('token',response['token'])
      this.router.navigate(['/home'])
      },
      error : err => {
        this.errorMessage = err.error.response.message
      }
    })  
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token)
      return true
    else
      return false
  }

  isLoggedOut(): boolean {
    window.location.reload()
    localStorage.clear();
    return false
  }
 

}
