import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-dialog-new-participant',
  templateUrl: './dialog-new-participant.component.html',
  styleUrls: ['./dialog-new-participant.component.css']
})
export class DialogNewParticipantComponent implements OnInit {
  participantForm: FormGroup;
  tripID: number;
  fellowTraveler = [];


  // tslint:disable-next-line:max-line-length
  constructor(private api: ApiService, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: ActivatedRoute) {
    this.participantForm = formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: [''],
      phone: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.api.currentMessage.subscribe( message => {
      this.tripID = message;
    });
  }

  // tslint:disable-next-line:typedef
  newParticipant(){
    if (this.participantForm.invalid){

    }
    else {
      // tslint:disable-next-line:max-line-length
      this.fellowTraveler.push({first_name: this.participantForm.controls.first_name.value , last_name: this.participantForm.controls.last_name.value, user_name: this.participantForm.controls.user_name.value, phone: this.participantForm.controls.phone.value , email: this.participantForm.controls.email.value});
      this.auth.add_Participant(this.tripID, {participants: this.fellowTraveler}).subscribe(rsp => {

      });
    }
  }

}
