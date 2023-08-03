import { Component, OnInit } from '@angular/core';
import { WavesService } from 'src/app/services/wave/waves.service';

@Component({
  selector: 'app-completelist',
  templateUrl: './completelist.component.html',
  styleUrls: ['./completelist.component.scss']
})
export class CompletelistComponent implements OnInit {
  constructor(public waves : WavesService){}

  ngOnInit() {
    this.waves.getReport()
  }

}
