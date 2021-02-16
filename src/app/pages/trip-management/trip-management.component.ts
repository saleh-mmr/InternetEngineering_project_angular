import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogNewParticipantComponent} from '../dialog-new-participant/dialog-new-participant.component';
import {ApiService} from '../../services/api.service';
import {log} from 'util';
import {DialogNewTransactionComponent} from '../dialog-new-transaction/dialog-new-transaction.component';

@Component({
  selector: 'app-trip-management',
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.css']
})
export class TripManagementComponent implements OnInit {
  tripInfoFormGroup: FormGroup;
  tripLeader: string;
  tripDestination: string;
  tripDetail: string;
  tripDate: string;
  participants = [];
  tDate: any;
  participantsFullName = [];
  participantsUserName = [];
  participantsEmail = [];
  participantsPhone = [];
  participantsID = [];
  participantsFlag = [];
  addBtnFlag = [];
  transactionFlag = [];
  addTransactionBtnFlag = [];
  transactionTitle = [];
  transactionCost = [];
  transactionPayer = [];
  Bname = [];
  bedehiCost = [];
  Tname = [];
  page = 0;
  bedehkarName: string;
  talabkarName: string;
  cosst: number;
  nextPageBtnFlag = [];
  currentFlagNextPageBtn = false;
  previousPageBtnFlag = [];
  currentFlagPreviousPageBtn = false;

  date = new FormControl(new Date());

  message: any;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private api: ApiService, private _formBuilder: FormBuilder, private auth: AuthenticationService, private router: ActivatedRoute, private route: Router, public dialog: MatDialog) {
    this.tripInfoFormGroup = this._formBuilder.group({
      tripDestination: ['', Validators.required],
      tripDate: ['', Validators.required],
      tripDetail: [''],
    });
  }

  // tslint:disable-next-line:typedef
  openDialog() {
    this.api.changeMessage(this.router.snapshot.params.id);
    const dialogRef = this.dialog.open(DialogNewParticipantComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.auth.trip_Info(this.router.snapshot.params.id).subscribe(rsp => {
        // tslint:disable-next-line:max-line-length
        this.participantsFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        // tslint:disable-next-line:max-line-length
        this.addBtnFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.participantsFullName = [];
        this.participantsUserName = [];
        this.participantsEmail = [];
        this.participantsPhone = [];
        this.participantsID = [];

        // @ts-ignore
        for (let i = 0; i < rsp.number; i++) {
          this.participantsFlag[i] = true;
        }
        // @ts-ignore
        this.addBtnFlag[rsp.number] = true;
        // @ts-ignore
        this.tripDestination = rsp.dest;
        // @ts-ignore
        this.tripLeader = rsp.leader;
        // @ts-ignore
        this.tripDetail = rsp.detail;
        // @ts-ignore
        this.tripDate = rsp.date;
        // tslint:disable-next-line:triple-equals
        // @ts-ignore
        for (let i = 1; i <= rsp.number; i++) {
          // @ts-ignore
          this.participantsFullName.push(rsp.participants[i].fullName);
          // @ts-ignore
          this.participantsUserName.push(rsp.participants[i].username);
          // @ts-ignore
          this.participantsEmail.push(rsp.participants[i].email);
          // @ts-ignore
          this.participantsPhone.push(rsp.participants[i].phone);
          // @ts-ignore
          this.participantsID .push(rsp.participants[i].id);
        }
      });
    });
  }

  // tslint:disable-next-line:typedef
  addTransactionDialog() {
    this.api.changeMessage(this.router.snapshot.params.id);
    const dialogRef = this.dialog.open(DialogNewTransactionComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.auth.trip_Transactions(this.router.snapshot.params.id).subscribe(rsp => {
        // tslint:disable-next-line:max-line-length
        this.transactionFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        // tslint:disable-next-line:max-line-length
        this.addTransactionBtnFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.transactionTitle = [];
        this.transactionCost = [];
        this.transactionPayer = [];

        // @ts-ignore
        for (let i = 0; i < rsp.number; i++) {
          this.transactionFlag[i] = true;
        }
        // @ts-ignore
        this.addTransactionBtnFlag[rsp.number] = true;
        // @ts-ignore
        for (let i = 1; i <= rsp.number; i++) {
          // @ts-ignore
          this.transactionTitle.push(rsp[i].title);
          // @ts-ignore
          this.transactionCost.push(rsp[i].cost);
          // @ts-ignore
          this.transactionPayer.push(rsp[i].payer);
        }

      });
    });
  }

  calculateDate(input): string{
    let day = input.date;
    let month = input.month;
    let year = input.year;
    if (day == 0){
      day = day + 1;
    }
    if (month == 0){
      month = month + 1;
    }
    if (year == 0){
      year = year + 1;
    }
    if (day < 10){
      day = '0' + day;
    }
    if (month < 10){
      month = '0' + month;
    }
    return (year + '-' + month + '-' + day);
  }

  // tslint:disable-next-line:typedef
  editTripInfo(){
    if (this.tripInfoFormGroup.controls.tripDate.invalid){
      this.tripInfoFormGroup.controls.tripDate.setValue(this.tripDate);

    }
    else {
      this.tDate = this.calculateDate(this.tripInfoFormGroup.controls.tripDate.value._i);
      this.tripInfoFormGroup.controls.tripDate.setValue(this.tDate);
    }
    if (this.tripInfoFormGroup.controls.tripDestination.invalid){
      this.tripInfoFormGroup.controls.tripDestination.setValue(this.tripDestination);
    }
    this.auth.edit_Trip_Info(this.router.snapshot.params.id, this.tripInfoFormGroup.value).subscribe( rsp => {
      console.log(rsp);
    });
  }

  ngOnInit(): void {
    this.page = 0;
    // tslint:disable-next-line:max-line-length
    this.participantsFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    // tslint:disable-next-line:max-line-length
    this.addBtnFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    // tslint:disable-next-line:max-line-length
    this.transactionFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    // tslint:disable-next-line:max-line-length
    this.addTransactionBtnFlag = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    this.auth.trip_Info(this.router.snapshot.params.id).subscribe(rsp => {
      // @ts-ignore
      for (let i = 0; i < rsp.number; i++) {
        this.participantsFlag[i] = true;
      }
      // @ts-ignore
      this.addBtnFlag[rsp.number] = true;
      // @ts-ignore
      this.tripDestination = rsp.dest;
      // @ts-ignore
      this.tripLeader = rsp.leader;
      // @ts-ignore
      this.tripDetail = rsp.detail;
      // @ts-ignore
      this.tripDate = rsp.date;
      // tslint:disable-next-line:triple-equals
      // @ts-ignore
      for (let i = 1; i <= rsp.number; i++) {
        // @ts-ignore
        this.participantsFullName.push(rsp.participants[i].fullName);
        // @ts-ignore
        this.participantsUserName.push(rsp.participants[i].username);
        // @ts-ignore
        this.participantsEmail.push(rsp.participants[i].email);
        // @ts-ignore
        this.participantsPhone.push(rsp.participants[i].phone);
        // @ts-ignore
        this.participantsID.push(rsp.participants[i].id);
      }
    });

    this.auth.trip_Transactions(this.router.snapshot.params.id).subscribe(rsp => {
      // @ts-ignore
      for (let i = 0; i < rsp.number; i++) {
        this.transactionFlag[i] = true;
      }
      // @ts-ignore
      this.addTransactionBtnFlag[rsp.number] = true;
      // @ts-ignore
      for (let i = 1; i <= rsp.number; i++) {
        // @ts-ignore
        this.transactionTitle.push(rsp[i].title);
        // @ts-ignore
        this.transactionCost.push(rsp[i].cost);
        // @ts-ignore
        this.transactionPayer.push(rsp[i].payer);
      }

    });
  }

  // tslint:disable-next-line:typedef
  editParticipantInfo(id: any){
    console.log(id);
  }

  // tslint:disable-next-line:typedef
  calculateDong(){
    this.nextPageBtnFlag = [];
    this.previousPageBtnFlag = [];
    this.auth.calculate_Dong(this.router.snapshot.params.id).subscribe(rsp => {
      console.log(rsp);
      this.previousPageBtnFlag.push(false);
      for (let i = 0; i < rsp.number; i++) {
        this.Bname.push(rsp[i].Bname);
        this.bedehiCost.push(rsp[i].cost);
        this.Tname.push(rsp[i].Tname);
        this.nextPageBtnFlag.push(true);
        this.previousPageBtnFlag.push(true);
      }
      if (rsp.number > 0){
        this.nextPageBtnFlag.pop();
        this.previousPageBtnFlag.pop();
        this.nextPageBtnFlag.push(false);
        this.currentFlagPreviousPageBtn = this.previousPageBtnFlag[0];
        this.currentFlagNextPageBtn = this.nextPageBtnFlag[0];
        this.bedehkarName = this.Bname[0];
        this.cosst = this.bedehiCost[0];
        this.talabkarName = this.Tname[0];
      }
      else {
        this.nextPageBtnFlag.push(false);
      }
    });
  }

  nextPage(): void{
    this.page = this.page + 1;
    this.bedehkarName = this.Bname[this.page];
    this.cosst = this.bedehiCost[this.page];
    this.talabkarName = this.Tname[this.page];
    this.currentFlagNextPageBtn = this.nextPageBtnFlag[this.page];
    this.currentFlagPreviousPageBtn = this.previousPageBtnFlag[this.page];

  }

  previousPage(): void{
    this.page = this.page - 1;
    this.bedehkarName = this.Bname[this.page];
    this.cosst = this.bedehiCost[this.page];
    this.talabkarName = this.Tname[this.page];
    this.currentFlagNextPageBtn = this.nextPageBtnFlag[this.page];
    this.currentFlagPreviousPageBtn = this.previousPageBtnFlag[this.page];
  }

}
