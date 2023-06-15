import { Component } from '@angular/core';
import { TodoserviceService } from '../../services/todo/todoservice.service';

@Component({
  selector: 'app-uncomplete',
  templateUrl: './uncomplete.component.html',
  styleUrls: ['./uncomplete.component.scss']
})
export class UncompleteComponent {


  constructor(public todo: TodoserviceService) { }

  ngOnInit() {
    // this.todo.getUserList()
  }
}
