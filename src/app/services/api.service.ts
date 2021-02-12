import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private messageSource = new BehaviorSubject<any>('default mesage');
  currentMessage = this.messageSource.asObservable();

  // tslint:disable-next-line:typedef
  changeMessage(message: any){
    this.messageSource.next(message);
  }

  constructor(private http: HttpClient) {  }

  // tslint:disable-next-line:typedef
  signup(data){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8000/signup/' , data , {headers: header});
  }


}
