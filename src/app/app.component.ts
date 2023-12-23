import { Component } from '@angular/core';
import { AuthService } from './authentification/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedInUserId: string = '';
  title = 'my-crud-app';
  constructor(public authService: AuthService) { }
  logout() {
    this.authService.doLogout()
  }
  
  
}
