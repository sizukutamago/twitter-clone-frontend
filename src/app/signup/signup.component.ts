import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name = '';

  password = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    this.authService
      .postSignUp(this.name, this.password)
      .subscribe((response) => {
        if (this.authService.signUp(response.accessToken)) {
          location.href = '/';
        }
      });
  }
}
