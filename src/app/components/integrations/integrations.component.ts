import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

//wizard
import {FormBuilder, Validators} from '@angular/forms';

import { IntegrationsService } from '../../services/integrations.service'; 

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {


  // wizard
  firstFormGroup = this._formBuilder.group({
    nsVendorCtrl: ['actility', Validators.required],
    nsIntegrationTypeCtrl: ['mqtt', Validators.required],
    asCtrl: ['abeemap', Validators.required],
    asIdCtrl: ['abeemap', Validators.required],
    asIntegrationTypeCtrl: ['http', Validators.required],
    asUrlCtrl: ['https://appserver.example.com', Validators.required],
    downlinkApiUrlCtrl: ['https://downlinkapi.example.com'],
    downlinkApiKeyCtrl: ['123456789'],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  nsVendors = [
    { name: "Actility", id: "actility"},
    { name: "Chirpstack", id: "chirpstack"},
    { name: "Everynet", id: "everynet"},
    { name: "Helium", id: "helium"},
    { name: "Loriot", id: "loriot"},
    { name: "Proximus", id: "proximus"},
    { name: "Senet", id: "senet"},
    { name: "TTN", id: "ttn"},
  ]



  userId:string|null = ''; 
  targetURL = '';
  trackerCommandsAPI = `${CONFIG.DX_LOCATION_API}/trackerCommands`;
  mqttBrokerWSS = `wss://${CONFIG.MQTT_BROKER}:${CONFIG.MQTT_WSS_PORT}/${CONFIG.MQTT_WEBSOCKET_PATH}`;
  mqttBrokerSSL = `mqtts://${CONFIG.MQTT_BROKER}:${CONFIG.MQTT_SSL_PORT}`;
  realm = CONFIG.realm;
  componentTitle = 'Integrations';

  constructor(
    
    // wizard
    private _formBuilder: FormBuilder,
    public authService: AuthService, 
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

  onASChange() {
    let asIdCtrl = this.firstFormGroup.get('asIdCtrl');
    if (!asIdCtrl) return;
    switch (this.firstFormGroup.value.asCtrl) {
      case 'adm':
        asIdCtrl.setValue('adm');
        break;
      case 'abeemap':
        asIdCtrl.setValue('abeemap');
        break;
      default:
        asIdCtrl.setValue('AS01');
    }
  }

}
