import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { CONFIG } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admurl = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const dxprofile:any = this.authService.userId?.split('/')[0].split('-')[0];
    if(dxprofile) {
      this.admurl = `${CONFIG.ADM_URL}?dxprofile=${dxprofile}&solver`
    }
  }

}
