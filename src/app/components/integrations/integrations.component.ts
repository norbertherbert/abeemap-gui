import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../environments/environment';

import { IntegrationsService } from '../../services/integrations.service'; 

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {

  userId:string|null = ''; 
  targetURL = '';
  
  componentTitle = 'Integrations';

  constructor(
    public integrationsService: IntegrationsService,
  ) { }

  ngOnInit(): void {

    let LE_AS_Topic = sessionStorage.getItem('mqtttop_' + CONFIG.client_id);
    if (!LE_AS_Topic) return;
    const topicSegments = LE_AS_Topic.split('/');
    this.userId = topicSegments[0];
    const userIdSegments = topicSegments[0].split('|');
    this.targetURL = `${CONFIG.nitURL}/mqtt/${userIdSegments[0]}/${userIdSegments[1]}/${topicSegments[1]}`;

  }

}
