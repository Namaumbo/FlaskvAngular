import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public userName: string = ''
  public password: string = ''
  public err: string = ''
  public userCredentials: any = {
    username: '',
    password: ''
  }
  // user : any = {}

  constructor(public user: UserService) { }
  public handleLogin() {
    this.userCredentials = {
      username: this.userName,
      password: this.password
    }
    if (this.password && this.userName) {
      this.user.userLogin(this.userCredentials).subscribe({
        next: (res) => {
          this.user.setUserName(res.user.name)
        }, error: (err) => {

          this.err = err.error.message
        }
      })
    }

  }
  ngOnInit() {

  }

}

