import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  Ajoutuser() {
    if (this.registerForm.invalid) {
      return;
    }

    // Handle user registration using AuthService
    this.authService.signUp(this.registerForm.value).subscribe(
      response => {
        // Handle successful registration, e.g., navigate to login page
        this.router.navigate(['/login']);
      },
      error => {
        // Handle registration error, e.g., show notification
        console.error('Registration failed:', error);
      }
    );
  }
}
