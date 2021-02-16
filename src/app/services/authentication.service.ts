import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private tripInfoUrl = 'http://127.0.0.1:8000/trip-info';
  private editTripInfoUrl = 'http://127.0.0.1:8000/edit-trip-info';
  private addParticipantUrl = 'http://127.0.0.1:8000/add-participant';
  private tripParticipantsUrl = 'http://127.0.0.1:8000/trip-participants';
  private tripTransactionsUrl = 'http://127.0.0.1:8000/trip-transactions';
  private calculateDongUrl = 'http://127.0.0.1:8000/calculate-dong';



  // tslint:disable-next-line:typedef
  login(data) {
    return this.http.post<any>('http://127.0.0.1:8000/login/', data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage to log user out
    this.http.get('http://127.0.0.1:8000/logout/' ).subscribe(data => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line:typedef
  new_Trip(data){
    return this.http.post<any>('http://127.0.0.1:8000/new-trip/', data);
  }

  // tslint:disable-next-line:typedef
  user_Info(){
    return this.http.get('http://127.0.0.1:8000/user-info/');
  }

  // tslint:disable-next-line:typedef
  add_Participant(id, data){
    return this.http.post<any>(`${this.addParticipantUrl}/${id}`, data);
  }

  // tslint:disable-next-line:typedef
  add_Transaction(data){
    return this.http.post<any>('http://127.0.0.1:8000/add-transaction/', data);
  }

  // tslint:disable-next-line:typedef
  trip_participants(id){
    return this.http.get(`${this.tripParticipantsUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  trip_Transactions(id){
    return this.http.get(`${this.tripTransactionsUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  check_Participant(data){
    return this.http.post<any>('http://127.0.0.1:8000/check-participant/', data);
  }

  // tslint:disable-next-line:typedef
  user_Trips(){
    return this.http.get('http://127.0.0.1:8000/user-all-trips/');
  }

  // tslint:disable-next-line:typedef
  trip_Info(id){
    return this.http.get(`${this.tripInfoUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  edit_Trip_Info(id, data){
    return this.http.post<any>(`${this.editTripInfoUrl}/${id}`, data);
  }

  // tslint:disable-next-line:typedef
  calculate_Dong(id){
    return this.http.get(`${this.calculateDongUrl}/${id}`);
  }

}
