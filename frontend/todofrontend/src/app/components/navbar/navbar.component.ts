import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { TodoserviceService } from '../../services/todo/todoservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  
  public userName : any
  handleLogOut() {
    // this.user.isLoggedIn()
    localStorage.setItem('token','')
    this.todo.setUserData('')

  }
  constructor(public user: UserService,public todo : TodoserviceService) {

  }

  ngOnInit(){
  this.userName  = localStorage.getItem('username')
  }

}
