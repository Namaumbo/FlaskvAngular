import { Component, OnInit,  Inject} from '@angular/core';
import { TodoserviceService } from '../../services/todo/todoservice.service';
import { DOCUMENT } from '@angular/common';

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
  public searchValue: string = ''
  public data : any  =  []

  constructor(public todo: TodoserviceService) {
  }
  ngOnInit() {
<<<<<<< HEAD
    this.todo.getUserList()
    
=======
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

>>>>>>> 1fe58478cd84d01bbaa10eec56501b9f4b977823
  }

  checkEnter() {
    this.handleAddTodo()
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


}
