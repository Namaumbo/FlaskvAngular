import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoserviceService } from '../../services/todo/todoservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



export interface todo {
  userId: number,
  id: number,
  title: string,
  description: string

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  displayedColumns: string[] = ['title', 'actions'];
  public todoTitle: string = ''
  public noItem: string = ''
  public todoDescription = ''

  @ViewChild(MatPaginator) paginator !: MatPaginator
  dataSource = new MatTableDataSource<todo>(this.todo.userData)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public todo: TodoserviceService) {
  }
  ngOnInit() {
    setTimeout(() => {

      if (this.todo.userData.length > 0) {
        console.log('refreshing')
        this.refreshPage()
      }
    }, 2000);
  }


  refreshPage() {
    // console.log(this.todo.userData)
    this.dataSource = new MatTableDataSource()
    this.dataSource = new MatTableDataSource<todo>(this.todo.userData)
    this.dataSource.paginator = this.paginator;
    // console.log( this.dataSource)

  }

  checkEnter() {
    this.handleAddTodo()
  }

  handleModal(item: any) {

    const myTitle = document.getElementById('title')
    const myDescription = document.getElementById('description')
    myTitle!.innerHTML = item['title']
    myDescription!.innerHTML = item['description']

  }

  handleAddTodo() {

    if (this.todoTitle.length == 0) {
      alert(' Title field is empty')
      return
    }
    if (this.todoDescription.length == 0) {
      alert('Description field is empty')
      return
    }

    this.todo.addTodoToUser(this.todoTitle, this.todoDescription)
    this.todoTitle = ''
    this.todoDescription = ''
  }
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
