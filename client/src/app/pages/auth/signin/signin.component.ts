import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  // Use the following code to log any error
  //       .pipe(tap({ error: console.error }))
  signin(): void {
    this.http
      .post('http://localhost:3000/api/signin', this.registerForm.value)
      .pipe(tap({ error: console.error }))
      .subscribe(() => this.router.navigate(['/']));
  }
  ngOnInit(): void {}
}
