import { Component, OnInit } from '@angular/core';
import { WavesService } from 'src/app/services/wave/waves.service';

@Component({
  selector: 'app-uncomplete',
  templateUrl: './uncomplete.component.html',
  styleUrls: ['./uncomplete.component.scss']
})
export class UncompleteComponent implements OnInit {



  public test = ''
  constructor(public waves : WavesService) { }

  public handlePlay(voxPath : string){
    this.test = ''
    setTimeout(() => {
        this.test = 'http://127.0.0.1:5000/api/v1/static/'+voxPath
    },100)
    }

    ngOnInit() {
      this.waves.getWaves()
    }

}
