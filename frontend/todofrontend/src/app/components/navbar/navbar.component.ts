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

  
  public username : any
  public searchValue : string = ''

  constructor(public user: UserService,public todo : TodoserviceService, public router : Router) {

  }

  ngOnInit(){
  this.username  = localStorage.getItem('username')
  }

  handleLogOut() {
    window.location.reload()
    localStorage.clear()
    this.todo.setUserData({})
    this.router.navigate([''])
  }

}
