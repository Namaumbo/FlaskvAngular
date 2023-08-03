import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router } from '@angular/router';
import { TodoserviceService } from 'src/app/services/todo/todoservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  
  public username : any
  public searchValue : string = ''

  constructor(public user: UserService, public router : Router , public todo: TodoserviceService) {

  }

  ngOnInit(){
  this.username  = localStorage.getItem('username')
  }

  handleLogOut() {
    window.location.reload()
    localStorage.clear()
    this.router.navigate([''])
  }

  
}
