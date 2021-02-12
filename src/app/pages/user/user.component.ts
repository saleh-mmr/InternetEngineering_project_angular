import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import AOS from 'aos';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserSignupSuccessfullyComponent} from '../user-signup-successfully/user-signup-successfully.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;
  durationInSeconds = 5;
  isLogin = true;


  @ViewChild('main') main: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginFormGroup = formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
    this.signupFormGroup = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],

    });
  }

  turnToSignUp(): void{
    this.main.nativeElement.classList.remove('col-11');
    this.sidebar.nativeElement.classList.remove('col-1');
    this.main.nativeElement.classList.add('col-1');
    this.sidebar.nativeElement.classList.add('col-11');
    this.isLogin = false;
  }

  turnToSignIn(): void{
    this.main.nativeElement.classList.add('col-11');
    this.sidebar.nativeElement.classList.add('col-1');
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.isLogin = true;
  }

  ngOnInit(): void {
    AOS.init();
    this.isLogin = true;
  }

  // tslint:disable-next-line:typedef
  login(){
    this.auth.login(this.loginFormGroup.value).subscribe(data => {
      console.log(data);
      if (data.access){
        this.router.navigate(['/profile']);
      }
    });
  }

  // tslint:disable-next-line:typedef
  openSnackBar() {
    this._snackBar.openFromComponent(UserSignupSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  // tslint:disable-next-line:typedef
  signup() {
    this.api.signup(this.signupFormGroup.value).subscribe(data => {
      // @ts-ignore
      if (data.flag){
        this.signupFormGroup.controls.username.setValue('');
        this.signupFormGroup.controls.password.setValue('');
        this.signupFormGroup.controls.cpassword.setValue('');
        this.signupFormGroup.controls.email.setValue('');
        this.signupFormGroup.controls.phone.setValue('');
        this.openSnackBar();
      }
      console.log(data);
    });
  }

}
