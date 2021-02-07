import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PizzaPartyComponent} from '../pizza-party-component/pizza-party-component.component';
import {MatStepper} from '@angular/material/stepper';
import {AuthenticationService} from '../../services/authentication.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
})
export class NewInvoiceComponent implements OnInit {
  isLinear = true;
  startTripFlag = false;
  startTripFlag0 = false;
  startTripFlag1 = false;
  startTripFlag2 = false;
  startTripFlag3 = false;
  startTripFlag4 = false;
  startTripFlag5 = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  durationInSeconds = 5;
  imagFlag0 = false;
  imagFlag1 = false;
  imagFlag2 = false;
  imagFlag3 = false;
  imagFlag4 = false;
  imagFlag5 = false;
  fellowTraveler = [];
  tDestination: string;
  tDate: any;
  tDetail: string;
  private data: { tripDetail: string; tripDate: string; tripDestination: string };


  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private auth: AuthenticationService) {
    this.firstFormGroup = this._formBuilder.group({
      tripDestination: ['', Validators.required],
      tripDate: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      fellowTravelerFName: [''],
      fellowTravelerLName: [''],
      fellowTravelerUserName: [''],
      fellowTravelerPhone: [''],
      fellowTravelerEmail: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      tripDetail: ['']
    });
  }

  // tslint:disable-next-line:typedef
  openSnackBar() {
      this._snackBar.openFromComponent(PizzaPartyComponent, {
        duration: this.durationInSeconds * 1000,
      });
  }

  startTrip(): void{
    if (!this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag0 = true;
    }
    else if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag1 = true;
    }
    else if (this.imagFlag0 && this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag2 = true;
    }
    else if (this.imagFlag0 && !this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag3 = true;
    }
    else if (this.imagFlag0 && this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag4 = true;
    }
    else if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && this.imagFlag3){
      this.startTripFlag = true;
      this.startTripFlag5 = true;
    }
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
  newTripFirstStep(stepper: MatStepper){
    if (this.firstFormGroup.controls.tripDestination.valid && this.firstFormGroup.controls.tripDate.valid) {
      this.tDestination = this.firstFormGroup.controls.tripDestination.value;
      this.tDate = this.calculateDate(this.firstFormGroup.controls.tripDate.value._i);
      stepper.next();
      this.imagFlag0 = true;
    }
  }

  // tslint:disable-next-line:typedef
  addFellowTraveler(){
    if (this.secondFormGroup.controls.fellowTravelerUserName.value != ''){
      this.auth.check_Participant({user_name: this.secondFormGroup.controls.fellowTravelerUserName.value}).subscribe( rsp => {
        if (rsp.flag == true){
          if (this.secondFormGroup.controls.fellowTravelerFName.value != ''){
            // tslint:disable-next-line:max-line-length
            this.fellowTraveler.push({first_name: this.secondFormGroup.controls.fellowTravelerFName.value , last_name: this.secondFormGroup.controls.fellowTravelerLName.value, user_name: this.secondFormGroup.controls.fellowTravelerUserName.value, phone: this.secondFormGroup.controls.fellowTravelerPhone.value , email: this.secondFormGroup.controls.fellowTravelerEmail.value});
            // tslint:disable-next-line:triple-equals
            if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3) {
              this.imagFlag1 = true;
            }else if (this.imagFlag0 && this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3){
              this.imagFlag1 = false;
              this.imagFlag2 = true;
            } else if (this.imagFlag0 && !this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
              this.imagFlag1 = true;
              this.imagFlag2 = true;
            } else if (this.imagFlag0 && this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
              this.imagFlag1 = false;
              this.imagFlag2 = false;
              this.imagFlag3 = true;
            } else if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && this.imagFlag3){
              this.imagFlag1 = false;
              this.imagFlag2 = false;
              this.imagFlag3 = true;
            }
            this.secondFormGroup.controls.fellowTravelerFName.setValue('');
            this.secondFormGroup.controls.fellowTravelerLName.setValue('');
            this.secondFormGroup.controls.fellowTravelerUserName.setValue('');
            this.secondFormGroup.controls.fellowTravelerPhone.setValue('');
            this.secondFormGroup.controls.fellowTravelerEmail.setValue('');
            console.log(this.fellowTraveler);
          }
        }
        else {
          this.secondFormGroup.controls.fellowTravelerUserName.setValue('');
        }
      });
    }
    else{
      if (this.secondFormGroup.controls.fellowTravelerFName.value != ''){
        // tslint:disable-next-line:max-line-length
        this.fellowTraveler.push({first_name: this.secondFormGroup.controls.fellowTravelerFName.value , last_name: this.secondFormGroup.controls.fellowTravelerLName.value, user_name: this.secondFormGroup.controls.fellowTravelerUserName.value, phone: this.secondFormGroup.controls.fellowTravelerPhone.value , email: this.secondFormGroup.controls.fellowTravelerEmail.value});
        // tslint:disable-next-line:triple-equals
        if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3) {
          this.imagFlag1 = true;
        }else if (this.imagFlag0 && this.imagFlag1 && !this.imagFlag2 && !this.imagFlag3){
          this.imagFlag1 = false;
          this.imagFlag2 = true;
        } else if (this.imagFlag0 && !this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
          this.imagFlag1 = true;
          this.imagFlag2 = true;
        } else if (this.imagFlag0 && this.imagFlag1 && this.imagFlag2 && !this.imagFlag3){
          this.imagFlag1 = false;
          this.imagFlag2 = false;
          this.imagFlag3 = true;
        } else if (this.imagFlag0 && !this.imagFlag1 && !this.imagFlag2 && this.imagFlag3){
          this.imagFlag1 = false;
          this.imagFlag2 = false;
          this.imagFlag3 = true;
        }
        this.secondFormGroup.controls.fellowTravelerFName.setValue('');
        this.secondFormGroup.controls.fellowTravelerLName.setValue('');
        this.secondFormGroup.controls.fellowTravelerUserName.setValue('');
        this.secondFormGroup.controls.fellowTravelerPhone.setValue('');
        this.secondFormGroup.controls.fellowTravelerEmail.setValue('');
        console.log(this.fellowTraveler);
      }
    }
  }

  // tslint:disable-next-line:typedef
  newTripFinalStep(){
    this.tDetail = this.thirdFormGroup.controls.tripDetail.value;
    this.data = {tripDestination: this.tDestination, tripDate: this.tDate, tripDetail: this.tDetail};
    this.auth.new_Trip(this.data).subscribe(rsp => {
      console.log(rsp);
      // tslint:disable-next-line:max-line-length
      this.auth.add_Participant({trip_dest: this.tDestination, trip_date: this.tDate, participants: this.fellowTraveler}).subscribe(rsp1 => {
        console.log(rsp1);
      });
    });
    this.thirdFormGroup.controls.tripDetail.setValue('');
    this.openSnackBar();
    this.startTrip();
  }


  ngOnInit(): void {
    this.startTripFlag = false;
    this.startTripFlag0 = false;
    this.startTripFlag1 = false;
    this.startTripFlag2 = false;
    this.startTripFlag3 = false;
    this.startTripFlag4 = false;
    this.startTripFlag5 = false;

    AOS.init();
  }
}
