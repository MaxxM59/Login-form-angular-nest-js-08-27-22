import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Move auth logic here
  private readonly authenticated = new Subject<boolean>();
  authenticated$ = this.authenticated.asObservable();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  isAuthenticated() {
    return this.httpClient.get<boolean>('http://localhost:3000/api/user').pipe(
      tap(() => {
        this.authenticated.next(true);
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    this.httpClient
      .post('http://localhost:3000/api/logout', {})
      .subscribe(() => {
        this.authenticated.next(false);
        this.router.navigate(['/login']);
      });
  }
}
