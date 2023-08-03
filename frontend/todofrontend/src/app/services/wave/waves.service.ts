import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class WavesService {
  public url = 'http://127.0.0.1:5000/api/v1/'
  public waves = []
  public wave: any = null
  public report: any = null
  constructor(public httpClient: HttpClient) { }

  public getWaves() {
    this.httpClient.get(this.url + 'get-vox').subscribe({
      next: (res: any) => {
       this.waves = res['vox_files'];
      },
      error: e => {
        console.log(e)
      }
    })
  }
  public serveWave(path: string) {
    this.httpClient.get(this.url + '/static/' + path).subscribe((res: any) => {
    this.wave = res
   })

  }
  public getReport(){
    this.httpClient.get(this.url + 'get-account-report').subscribe({
      next: (res: any) => {
        this.report = res['file']
        },
      error: e => {
        console.log(e)
      }
    })
  }

}
