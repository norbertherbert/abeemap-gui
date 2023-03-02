import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../environments/environment';

import { IntegrationsService } from '../../services/integrations.service'; 

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  targetURL = '';
  
  componentTitle = 'Integrations';

  constructor(
    public integrationsService: IntegrationsService,
  ) { }

  ngOnInit(): void {

    const mqttTopic = sessionStorage.getItem('mqtttop_' + CONFIG.client_id);
    if (!mqttTopic) return;
    const topicSegments = mqttTopic.split('/');
    const userIdSegments = topicSegments[0].split('|');
    this.targetURL = `${CONFIG.nitURL}/mqtt/${userIdSegments[0]}/${userIdSegments[1]}/${topicSegments[1]}/${topicSegments[2]}`;

  }

}
