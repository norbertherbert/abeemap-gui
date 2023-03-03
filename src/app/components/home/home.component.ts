import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  admurl = `${CONFIG.ADM_URL}?dxprofile=${CONFIG.DXAPI_PROFILE}&solver`

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
