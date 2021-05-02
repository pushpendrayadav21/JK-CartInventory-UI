import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../all-service/authentication.service';
import { NotificationService } from '../all-service/notification.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
    fieldTextType: boolean;
  private subscriptions: Subscription[] = [];
  signupForm: FormGroup;
  submitted = false;
  apiResponse = { message: '', error: false };
  errorFieldSubmitted = {};
/*
  signupForm: FormGroup;
  submitted = false;
  apiResponse = { message: '', error: false };
  errorFieldSubmitted = {};
*/
  constructor(private router: Router, private authenticationService: AuthenticationService,
              private fb: FormBuilder, private http: HttpClient,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.signupForm = this.fb.group({
        fName: [null, [Validators.required]],
        lName: [null, [Validators.required]],
        usere: [null, [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        pass: [null, [Validators.required]],
        rePass: [null, [Validators.required]]
        });

      this.router.navigateByUrl('/user/management');
    }
  }

  private createFromForm(): User {
    return {
      ...new User(),
      firstName: this.signupForm.get(['fName']).value,
      lastName: this.signupForm.get(['lName']).value,
      username: this.signupForm.get(['usere']).value,
      email: this.signupForm.get(['email']).value,
      password: this.signupForm.get(['pass']).value,
      confirmPassword: this.signupForm.get(['rePass']).value
    };
  }

  get registerFormControl() {
    return this.signupForm.controls;
  }
    save(): void {
    this.showLoading = true;
    const user = this.createFromForm();
    this.subscriptions.push(
    this.authenticationService.register(new User()).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.errorFieldSubmitted = {};
          this.apiResponse.error = false;
          this.apiResponse.message = 'Successful registration Asaad';
        },
        error  => {
          const errorResponse = JSON.parse(error.error);
          this.apiResponse.error = true;
          this.apiResponse.message = 'Registration error Asaad';
          if (errorResponse.error && errorResponse.message === 'VALIDATION_FAILED') {
            this.errorFieldSubmitted = errorResponse.data;
          }
        }
    )
    );
  }
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }
    public onRegister(user: User): void {
        this.showLoading = true;
        this.submitted = true;
        this.subscriptions.push(
            this.authenticationService.register(user).subscribe(
                (response: User) => {
                    this.showLoading = false;
                    this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName} with Password rules.
        Please active your email and login into our system.`);
                },

                error => {

                    this.sendNotification(NotificationType.ERROR, error.error.message);
                    this.showLoading = false;
                    const errorResponse = JSON.parse(error.error);
                    this.apiResponse.error = true;
                    this.apiResponse.message = 'Registration error Asaad';
                    if (errorResponse.error && errorResponse.message === 'VALIDATION_FAILED') {
                        this.errorFieldSubmitted = errorResponse.data;
                    }
                }
            )
        );
    }

/*

                (errorResponse: HttpErrorResponse) => {
                    this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
                    this.showLoading = false;
                    }
 */






private sendNotification(notificationType: NotificationType, message: string): void {
  if (message) {
    this.notificationService.notify(notificationType, message);
  } else {
    this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  }
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

}

