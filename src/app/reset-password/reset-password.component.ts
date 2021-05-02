import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../all-service/loading.service';
import { UserService } from '../all-service/user.service';
import { AlertType } from '../enum/alert-type.enum';
import { AlertService } from '../all-service/alert.service';
import {NgForm} from '@angular/forms';
import {CustomHttpRespone} from '../model/custom-http-response';
import {NotificationType} from '../enum/notification-type.enum';
import {NotificationService} from '../all-service/notification.service';
import {AuthenticationService} from '../all-service/authentication.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public refreshing: boolean;
  private subscriptions: Subscription[] = [];
    constructor(
    private loadingService: LoadingService, private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService) {}
   ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/changepassword');
    }
  }
  /*
   */
   private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
        this.notificationService.notify(notificationType, message);
    } else {
        this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
}
ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
}
    /*
     public onResetPassword(emailForm: NgForm): void {
        this.refreshing = true;
        const emailAddress = emailForm.value['reset-password-email'];
        this.subscriptions.push(
            this.userService.resetPasswordold(emailAddress).subscribe(
                (response: CustomHttpRespone) => {
                  this.sendNotification(NotificationType.SUCCESS, response.message);
                  this.refreshing = false;
                },
                (error: HttpErrorResponse) => {
                  this.sendNotification(NotificationType.WARNING, error.error.message);
                  this.refreshing = false;
                },
                () => emailForm.reset()
            )
        );
      }
  */
    onResetpassword(form): void {
        this.loadingService.isLoading.next(true);
        console.log(form.email);
        const email: string = form.email;
        this.subscriptions.push(
          this.userService.resetPassword(email).subscribe(
            response => {
              console.log(response);
              this.loadingService.isLoading.next(false);
              this.sendNotification(NotificationType.SUCCESS, response.message);
              },
            (error: HttpErrorResponse) => {
              console.log(error);
              const errorMsg = error.error;
              if (errorMsg === 'emailNotFound') {
                  this.sendNotification(NotificationType.WARNING, error.error.message);
              }
              if (errorMsg !== 'emailNotFound') {
                  this.sendNotification(NotificationType.WARNING, error.error.message);
              }
              this.loadingService.isLoading.next(false);
            }
          )
        );
      }
    }
