import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      password_confirm: [''],
    });
  }
  signup(): void {
    this.http
      .post('http://localhost:3000/api/signup', this.registerForm.value)
      .pipe(tap({ error: console.error }))
      .subscribe(() => this.router.navigate(['/login']));
  }

  ngOnInit(): void {}
}
