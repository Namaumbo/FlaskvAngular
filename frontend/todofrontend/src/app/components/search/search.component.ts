import { Component } from '@angular/core';
import { TodoserviceService } from 'src/app/services/todo/todoservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  constructor(public todo: TodoserviceService) { }
}
