import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-recent-invoice',
  templateUrl: './recent-invoice.component.html',
  styleUrls: ['./recent-invoice.component.css']
})
export class RecentInvoiceComponent implements OnInit {
  showFlag1 = false;
  showFlag2 = false;
  showFlag3 = false;
  showFlag4 = false;
  showFlag5 = false;
  showFlag6 = false;
  showFlag7 = false;
  showFlag8 = false;
  showFlag9 = false;
  tripDestTitle = [];
  tripDateString = [];
  tripDetailString = [];


  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {

    this.auth.user_Trips().subscribe(rsp => {
      console.log(rsp);
      // @ts-ignore
      console.log(rsp.number);
      if (rsp.number == 1){
        this.showFlag1 = true;
      }
      else if (rsp.number == 2){
        this.showFlag1 = true;
        this.showFlag2 = true;
      }
      else if (rsp.number == 3){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
      }
      else if (rsp.number == 4){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
      }
      else if (rsp.number == 5){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
        this.showFlag5 = true;
      }
      else if (rsp.number == 6){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
        this.showFlag5 = true;
        this.showFlag6 = true;
      }
      else if (rsp.number == 7){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
        this.showFlag5 = true;
        this.showFlag6 = true;
        this.showFlag7 = true;
      }
      else if (rsp.number == 8){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
        this.showFlag5 = true;
        this.showFlag6 = true;
        this.showFlag7 = true;
        this.showFlag8 = true;

      }
      else if (rsp.number == 9){
        this.showFlag1 = true;
        this.showFlag2 = true;
        this.showFlag3 = true;
        this.showFlag4 = true;
        this.showFlag5 = true;
        this.showFlag6 = true;
        this.showFlag7 = true;
        this.showFlag8 = true;
        this.showFlag9 = true;
      }
      for (let i = 1; i <= rsp.number; i++){
        this.tripDestTitle.push(rsp[i].dest);
        this.tripDateString.push(rsp[i].date);
        this.tripDetailString.push(rsp[i].detail);
      }

    });
  }

}
