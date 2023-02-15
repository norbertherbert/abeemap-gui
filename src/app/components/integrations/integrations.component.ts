import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../environments/environment';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  targetURL = '';
  
  componentTitle = 'Integrations';
  
  appServerConnectionsVisible = false;
  networkServerConnectionsVisible = false;

  constructor() { 
  }

  ngOnInit(): void {
    const mqttTopic = sessionStorage.getItem('mqtttop_' + CONFIG.client_id);
    this.targetURL = `${CONFIG.nitURL}/mqtt/${mqttTopic}`;
  }

}
