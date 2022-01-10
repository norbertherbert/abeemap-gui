import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  componentTitle = 'Resolved Message Logs';
  // elementName = 'device';
  elementIdPropertyName = 'ref';
  displayedColumns: string[] = [
    'deviceEUI',
    'time',
    'messageType',
    // 'lon',
    // 'lat',
    // 'horizontalAccuracy',
    // 'age',
    // 'payload',
  ];

  locationUpdateLogs: Subject<any>;

  isLoading = false;
 
  constructor(
    private logsService: LogsService,
  ) { 
    this.locationUpdateLogs = this.logsService.locationUpdateLogs$;
  }

  ngOnInit(): void {
  }


  str(msg:any) {
    return JSON.stringify(msg);
  }

  formatTime(time:string) {
    const d = new Date(time);
    const d1 = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return d1.toISOString().slice(0, 19).replace('T', ' ');
  }

}
