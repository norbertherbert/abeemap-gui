import { Injectable, OnInit } from '@angular/core';
import * as PahoMQTT from 'paho-mqtt';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import { CONFIG } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MqttClientService implements OnInit {

  client: any;
  connected = false;
  subscribed = false;

  message$ = new Subject<any>();
  /// message$ = new ReplaySubject<any>(5);
  locationUpdateMessage$ = new Subject<any>();

  constructor() { }

  ngOnInit(): void {

    this.client = new PahoMQTT.Client(CONFIG.MQTT_BROKER, Number(CONFIG.MQTT_PORT), CONFIG.MQTT_CLIENT_ID);

    this.client.onConnectionLost = (responseObject:any) => {
      this.connected = false;
      this.subscribed = false;
      if (responseObject.errorCode !== 0) {
        console.log(`CONNECTION LOST:${responseObject.errorMessage}`);
      }
    }

    this.client.onMessageArrived = (message:any) => {
      const msg = JSON.parse(message.payloadString);
      // delete msg.uplinkPayload;
      delete msg.processedFeed;
      delete msg.rawPosition;
      delete msg.resolvedTracker
      const msgFormatted = `\n\n*****\nTOPIC: "${message.destinationName}"\n*****\n${JSON.stringify(msg)}\n}`;
      console.log(msgFormatted);

      // this.logsService.addLocationUpdateLogs(msg);
      this.message$.next(msg);

      if (msg.coordinates && msg.coordinates[0] && msg.coordinates[1]) {
        // this.leafletMapService.updateDeviceMarker(msg);
        this.locationUpdateMessage$.next(msg);
      }

    }

    this.connect();

  } 

  connect() {

    const userName = sessionStorage.getItem('mqttusr_' + CONFIG.client_id);
    const password = sessionStorage.getItem('mqttpwd_' + CONFIG.client_id);
    const subscriberId = sessionStorage.getItem('mqttsbs_' + CONFIG.client_id);

    if ( !(userName && password && subscriberId) ) {
      console.log(`CONNECTION FAILURE: No MQTT credentials are cached in localStorage yet!`);
      return;
    }

    this.client.connect({
      userName: userName,
      password: password,
      onSuccess: async () => {
        this.connected = true;
        console.log(`MQTT CLIENT CONNECTED`);
        this.subscribe();
      },
      onFailure: (responseObject:any) => {
        this.connected = false;
        if (responseObject.errorCode !== 0) {
          console.log(`CONNECTION FAILURE:${responseObject.errorMessage}`);
        }
      }
    });

  }

  disconnect() {
    if (!this.connected) {
      console.log('DISCONNECTION FAILURE: You are not connected to the server!');
      return;
    }
    this.client.disconnect();
    this.connected = false;
    this.subscribed = false;
  }

  subscribe() {
    if (!this.connected) {
      console.log('SUBSCRIPTION FAILURE: You are not connected to the server!');
      return;
    }
    
    const subscriberId = sessionStorage.getItem('mqttsbs_' + CONFIG.client_id);

    this.client.subscribe(
      `${subscriberId}/${CONFIG.MQTT_TOPIC}`,
      {
        onSuccess: () => {
          this.subscribed = true;
        },
        onFailure: (responseObject:any) => {
          this.subscribed = false;
          if (responseObject.errorCode !== 0) {
            console.log(`SUBSCRIPTION FAILURE:${responseObject.errorMessage}`);
          }
        }
      }
    );
  }

  unsubscribe() {
    if (!this.connected) {
      console.log('UNSUBSCRIPTION FAILURE: You are not connected to the server!');
      return;
    }
    if (!this.subscribed) {
      console.log('UNSUBSCRIPTION FAILURE: You are not subscribed!');
      return;
    }

    const subscriberId = sessionStorage.getItem('mqttsbs_' + CONFIG.client_id);

    this.client.unsubscribe(
      `${subscriberId}/${CONFIG.MQTT_TOPIC}`,
      {
        onSuccess: () => {
          this.subscribed = false;
        },
        onFailure: (responseObject:any) => {
          if (responseObject.errorCode !== 0) {
            console.log(`UNSUBSCRIPTION FAILURE:${responseObject.errorMessage}`);
          }
        }
      }
    );
  }

}
