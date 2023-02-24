import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user').subscribe(
      (user: any) => {
        this.message = `Hi ${user.first_name} ${user.last_name}`;
      },
      () => {
        this.message = 'Please login !';
      }
    );
    // service + auth guard
  }
}
