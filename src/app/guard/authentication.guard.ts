import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../all-service/authentication.service';
import { NotificationService } from '../all-service/notification.service';
import { State } from '../common/state';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private notificationService: NotificationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    else{

    }
    this.router.navigate(['/login-user']
    );
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    return false;
  }

}
