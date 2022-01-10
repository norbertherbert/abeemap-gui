import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MqttClientService } from './mqtt-client.service';


@Injectable({
  providedIn: 'root'
})
export class LogsService implements OnInit {

  locationUpdateLogs: Array<string> = [];
  locationUpdateLogs$ = new BehaviorSubject<any>({});

  constructor(
    private mqttClientService: MqttClientService
  ) {
  }

  ngOnInit(): void { 
    this.mqttClientService.message$.subscribe( (msg) => {
      this.locationUpdateLogs.push(msg);
      this.locationUpdateLogs$.next(this.locationUpdateLogs);
    })
  }

}
