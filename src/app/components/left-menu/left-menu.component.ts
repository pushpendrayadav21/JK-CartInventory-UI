import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/all-service/authentication.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private authService:AuthenticationService) { 
    
  }

  logout(){
    this.authService.logOut();
  }
  ngOnInit(): void {
  }

}
