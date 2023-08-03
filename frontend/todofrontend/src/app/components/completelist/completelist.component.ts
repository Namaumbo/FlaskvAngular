import { Component, OnInit } from '@angular/core';
import { TodoserviceService } from 'src/app/services/todo/todoservice.service';

@Component({
  selector: 'app-completelist',
  templateUrl: './completelist.component.html',
  styleUrls: ['./completelist.component.scss']
})
export class CompletelistComponent implements OnInit {
  constructor(public todo : TodoserviceService){}

  ngOnInit() {
    this.todo.getCompleteList()
    console.log(this.todo.totalCompletedList)
  }

}
