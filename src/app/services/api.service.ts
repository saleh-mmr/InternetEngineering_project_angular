import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

  // tslint:disable-next-line:typedef
  signup(data){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8000/signup/' , data , {headers: header});
  }

  // tslint:disable-next-line:typedef
  get_all_reports(){
    return this.http.get('http://127.0.0.1:8000/show-report-list/');
  }
}
