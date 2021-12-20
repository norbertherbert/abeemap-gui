import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AbeeMap';

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }
}
