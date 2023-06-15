import { Component } from '@angular/core';
import { TodoserviceService } from '../../services/todoservice.service';

@Component({
  selector: 'app-completelist',
  templateUrl: './completelist.component.html',
  styleUrls: ['./completelist.component.scss']
})
export class CompletelistComponent {


  constructor(public todo: TodoserviceService) { }

  ngOnInit() {
    // this.todo.getUserList()
  }
}
