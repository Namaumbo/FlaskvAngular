import { Component,OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user/user.service';

import { TodoserviceService } from './services/todo/todoservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';

export interface todoInterface {
 title:string,
 id : number,
 description : string 
 userId : number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['position',  'name', 'actions']
  dataSource = new MatTableDataSource(this.todo.userData)
  title = 'Todo';
  

  constructor(
    public user: UserService,
    public todo: TodoserviceService
  ) {

  }
  ngOnInit() {
    this.todo.getUserList()
  }

 
}
