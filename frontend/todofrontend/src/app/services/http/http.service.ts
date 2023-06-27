import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public backendUrl = 'http://127.0.0.1:3000/api/v1'; //this is the URL for the backend server in production
  // public backendUrl = 'http://192.168.0.182:5000/api/v1'
  constructor(
    private http: HttpClient,
  ) { }

  public postNoAuthorization(endpoint: string, data: any) {
    return this.http.post(`${this.backendUrl}/${endpoint}`, data);
  }
  public getNoAuthorization(endpoint: string) {
    return this.http.get(`${this.backendUrl}/${endpoint}`);
  }

  public postNoAuthorizationURL(endpoint: string, data: any) {
    return this.http.post(`${endpoint}`, data);
  }
  public getNoAuthorizationURL(endpoint: string) {
    return this.http.get(`${endpoint}`);
  }


  public getToken() {
    try {
      const token = localStorage.getItem('token')
      return token;
    } catch (e) {
      return 'nothing';
    }
  }

  public get(endpoint: string, limit: number, page: number) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    const httpOptions = {
      headers: header
    };
    return this.http.get(`${this.backendUrl}/${endpoint}?limit=${limit}&page=${page} `, httpOptions);
  }

  public getCall(endpoint: string) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    const httpOptions = {
      headers: header
    };
    return this.http.get(`${endpoint}`, httpOptions);
  }

  public post(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    const httpOptions = {
      headers: header
    };
    return this.http.post(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }

  public delete_data(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cross-origin', '*')
      .set('Authorization', `Bearer ${this.getToken()}`);
    const httpOptions = {
      headers: header
    };
    return this.http.post(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }

  public delete(endpoint: string) {


    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);

    const httpOptions = {
      headers: header
    };
    return this.http.delete(`${this.backendUrl}/${endpoint}`, httpOptions);
  }

  public update(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    const httpOptions = {
      headers: header
    };
    return this.http.put(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }


  public patch(endpoint: string, data: any) {
    let header;

    header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);

    const httpOptions = {
      headers: header
    };
    return this.http.patch(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }
}

