import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  prefix;
  userId;
  scope;
  sessionExpires;

  constructor(
    public authService: AuthService
  ) { 
    this.prefix = this.authService.userId?.split('/')[0] || '';
    this.userId = this.authService.userId?.split('/')[1] || '';
    this.scope = (Array.isArray(this.authService.scope)) ? this.authService.scope[0] : '';
    this.sessionExpires = this.authService.getExp() || '';
  }

  ngOnInit(): void {
  }

}
