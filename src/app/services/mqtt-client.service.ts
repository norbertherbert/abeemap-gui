import { Injectable, OnInit } from '@angular/core';
import * as PahoMQTT from 'paho-mqtt';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';

import { CONFIG } from '../../environments/environment';

import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MqttClientService implements OnInit {

  client: any;
  //connected = false;
  subscribed = false;

  connected$ = new BehaviorSubject(false);

  message$ = new Subject<any>();
  // message$ = new ReplaySubject<any>(5);
  locationUpdateMessage$ = new Subject<any>();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.client = new PahoMQTT.Client(
      `${CONFIG.MQTT_WEBSOCKET_PROTOCOL}://${CONFIG.MQTT_BROKER}:${CONFIG.MQTT_WSS_PORT}/${CONFIG.MQTT_WEBSOCKET_PATH}`,
      CONFIG.MQTT_CLIENT_ID_PREFIX + Math.floor(Math.random() * 1000000)
    );
    // this.client = new PahoMQTT.Client(CONFIG.MQTT_BROKER, Number(CONFIG.MQTT_WSS_PORT), CONFIG.MQTT_CLIENT_ID);

    this.client.onConnectionLost = (responseObject:any) => {
      // this.connected = false;
      this.connected$.next(false);
      this.subscribed = false;
      if (responseObject.errorCode !== 0) {
        console.log(`MQTT CONNECTION LOST:${responseObject.errorMessage}`);
        this.reportError(`MQTT CONNECTION LOST:${responseObject.errorMessage}`)
      }
    }

    this.client.onMessageArrived = (message:any) => {
      try {
        const msg = JSON.parse(message.payloadString);
      
        // delete msg.uplinkPayload;
        delete msg.processedFeed;
        delete msg.rawPosition;
        delete msg.resolvedTracker
        // const msgFormatted = `\n\n*****\nTOPIC: "${message.destinationName}"\n*****\n${JSON.stringify(msg)}\n}`;
        // console.log(msgFormatted);

        // this.logsService.addLocationUpdateLogs(msg);
        this.message$.next(msg);

        if (msg.coordinates && msg.coordinates[0] && msg.coordinates[1]) {
          // this.leafletMapService.updateDeviceMarker(msg);
          this.locationUpdateMessage$.next(msg);
        }
      } catch(err:any) {
        console.log(err.messaage);
        return;
      }
    }

    this.connect();

  } 

  connect() {
    setTimeout( () => {
      const mqttUserName = this.authService.mqttUserName;
      const mqttPassword = this.authService.mqttPassword;
      const mqttTopic = this.authService.mqttTopic;

      if ( !(mqttUserName && mqttPassword && mqttTopic) ) {
        console.log(`MQTT CONNECTION FAILURE: No proper MQTT params are cached in localStorage yet!`);
        this.reportError(`CONNECTION FAILURE: No API Key has been provided!`);
        return;
      }

      this.client.connect({
        userName: mqttUserName,
        password: mqttPassword,
        onSuccess: async () => {
          // this.connected = true;
          this.connected$.next(true);
          console.log(`MQTT CLIENT CONNECTED`);
          this.reportEvent(`MQTT Client Connected to Broker`);
          this.subscribe();
        },
        onFailure: (responseObject:any) => {
          // this.connected = false;
          this.connected$.next(false);
          if (responseObject.errorCode !== 0) {
            console.log(`CONNECTION FAILURE:${responseObject.errorMessage}`);
            this.reportError(`MQTT Client Couldn't connect to Broker`);
          }
        }
      });
    }, 1000)
  }

  disconnect() {
    // if (!this.connected) {
    if (!this.connected$.getValue()) {
      console.log('DISCONNECTION FAILURE: You are not connected to the server!');
      return;
    }
    this.client.disconnect();
    // this.connected = false;
    this.connected$.next(false);
    this.subscribed = false;
    this.reportEvent(`MQTT Client Disconnected from Broker`);
  }

  subscribe() {
    // if (!this.connected) {
    if (!this.connected$.getValue()) {
      console.log('SUBSCRIPTION FAILURE: You are not connected to the server!');
      return;
    }
    
    const mqttTopic = this.authService.mqttTopic;

    console.log(`****************** TOPIC ********************`);
    console.log(mqttTopic);
    console.log(`****************** TOPIC ********************`);

    this.client.subscribe(
      mqttTopic,
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
    // if (!this.connected) {
    if (!this.connected$.getValue()) {
      console.log('UNSUBSCRIPTION FAILURE: You are not connected to the server!');
      return;
    }
    if (!this.subscribed) {
      console.log('UNSUBSCRIPTION FAILURE: You are not subscribed!');
      return;
    }

    const subscriberId = this.authService.subscriberId;
    const mqttTopic = this.authService.mqttTopic;

    this.client.unsubscribe(
      mqttTopic,
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

  reportEvent(event:string) {
    this.snackBar.open(event, 'OK', {
      panelClass: ['green-snackbar'],
      duration: 3000,
    });
  }

  reportError(error:string) {
    this.snackBar.open(
      'MQTT EVENT: ' + JSON.stringify(error), 
      'x', 
      { panelClass: ['red-snackbar'] }
    );       
  }

}
