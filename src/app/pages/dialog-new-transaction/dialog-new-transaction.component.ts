import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

interface Food {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-new-transaction',
  templateUrl: './dialog-new-transaction.component.html',
  styleUrls: ['./dialog-new-transaction.component.css']
})
export class DialogNewTransactionComponent implements OnInit {

  selectedValue: string;
  transactionForm: FormGroup;
  tripID: any;
  foods: Food[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private api: ApiService, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: ActivatedRoute) {
    this.transactionForm = formBuilder.group({
      trip_id: ['', Validators.required],
      payerID: ['', Validators.required],
      transaction_title: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.api.currentMessage.subscribe( message => {
      this.tripID = message;
    });
    this.transactionForm.controls.trip_id.setValue(this.tripID);
    this.auth.trip_participants(this.tripID).subscribe(rsp => {
      // @ts-ignore
      for (const i of rsp ){
        this.foods.push(i);
      }
    });
  }

  // tslint:disable-next-line:typedef
  newTransaction(){
    if (this.transactionForm.controls.trip_id.invalid){
      console.log('trip_id');
    }
    else if (this.transactionForm.controls.payerID.invalid){
      console.log('payerID');
    }
    else if (this.transactionForm.controls.transaction_title.invalid){
      console.log('transaction_title');
    }
    else if (this.transactionForm.controls.cost.invalid){
      console.log('cost');
    }
    else {
      this.auth.add_Transaction(this.transactionForm.value).subscribe(rsp => {
        console.log(rsp);
      });
    }
  }

}
