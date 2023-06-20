import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { TodoserviceService } from '../../services/todo/todoservice.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  
  public userName : any

  constructor(public user: UserService,public todo : TodoserviceService, public router : Router) {

  }

  ngOnInit(){
  // this.userName  = localStorage.getItem('username')
  }

  handleLogOut() {
    
    localStorage.setItem('token','')
    this.todo.setUserData({})
    this.router.navigate([''])
    this.user.errorMessage = ''


  }
}
