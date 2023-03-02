import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {

  panel1Opened = false;
  panel2Opened = false; 
  panel3Opened = false;

  openedPanelName = '2';

  constructor() { }

}
