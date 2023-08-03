import { Component, OnInit,  Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WavesService } from 'src/app/services/wave/waves.service';
import { Router } from '@angular/router';

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
export class HomeComponent {
  public test = ''

  constructor(public waves : WavesService , public router: Router ) {
    
  }
  public open(path: string){
    this.router.navigate([`/${path}`])
  }

  }


