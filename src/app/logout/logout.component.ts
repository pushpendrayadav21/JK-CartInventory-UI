import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../all-service/authentication.service';
import { NotificationService } from '../all-service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router,
    private authenticationService: AuthenticationService,private notificationService: NotificationService) { 
    
  }

  ngOnInit(): void {
  }

  logout(){
    console.log("> in logout")
    this.authenticationService.logOut();
    this.router.navigate(['/login-user']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
}
