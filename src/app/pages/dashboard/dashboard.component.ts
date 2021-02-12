import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DashboardComponent implements OnInit {
  username: string;
  firstName: string;
  lastName: string;
  dtext: string;
  initFlag = false;


  @ViewChild('main') main: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(private auth: AuthenticationService) { }

  newInvoice(): void{
    this.initFlag = true;
    this.main.nativeElement.classList.remove('col-11');
    this.sidebar.nativeElement.classList.remove('col-1');
    this.main.nativeElement.classList.add('col-3');
    this.sidebar.nativeElement.classList.add('col-9');
  }

  recentInvoice(): void{
    this.initFlag = true;
    this.main.nativeElement.classList.remove('col-11');
    this.sidebar.nativeElement.classList.remove('col-1');
    this.main.nativeElement.classList.add('col-3');
    this.sidebar.nativeElement.classList.add('col-9');
  }

  testfunc(): void{
    this.main.nativeElement.classList.remove('col-11');
    this.sidebar.nativeElement.classList.remove('col-1');
    this.main.nativeElement.classList.add('col-3');
    this.sidebar.nativeElement.classList.add('col-9');
  }

  logout(): void{
    this.auth.logout();
  }

  ngOnInit(): void {
    this.auth.user_Info().subscribe( rsp => {
      // @ts-ignore
      this.username = rsp.username;
      // @ts-ignore
      this.firstName = rsp.firstName;
      // @ts-ignore
      this.lastName = rsp.lastName;
      this.dtext = this.firstName + ' ' + this.lastName;
    });
    this.initFlag = false;
  }

}
