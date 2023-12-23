import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { FactureService } from 'src/app/factures/facture.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    public factureService: FactureService
  ) {}

  email: string = '';
  password: string = '';

  loginUser() {
    const userlogin = {
      email: this.email,
      password: this.password
    };
  
    this.authService.signIn(userlogin).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('refresh_token', res.refreshToken);
  
        if (res && res.id) {
          this.storeUserId(res.id); // Store user ID securely
          
        } else {
          console.error('User ID not found in the response');
        }
  
        this.router.navigate(['ecom']);
      },
      (error) => {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
      }
    );
  }

  storeUserId(userId: string) {
    sessionStorage.setItem('user_id', userId); // Use sessionStorage for more secure storage
  }



  filterFacturesForCurrentUser(factures: any[], userId: string): any[] {
    return factures.filter(facture => {
      return facture.userId === userId;
    });
  }
}
