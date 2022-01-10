import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

// import { Inject }  from '@angular/core';
// import { DOCUMENT } from '@angular/common';

// import { MqttClientService } from '../../services/mqtt-client.service';

import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { LeafletMapService } from '../../services/leaflet-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  private map: any;

  constructor(
    // @Inject(DOCUMENT) document:any,
    private leafletMapService: LeafletMapService,
    // private mqttClientService: MqttClientService,
  ) {

  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 

    // (document.getElementById('map-container') as HTMLElement).innerHTML = "<div id='map' style='width: 100%; height: 100%; z-index: 5;'></div>";

    setTimeout( () => {
      this.map = L.map('map', {
        center: [ 25, 0 ],
        zoom: 3,
      });
      this.leafletMapService.initDeviceMap(this.map);
      // this.leafletMapService.initGeoman(this.map);
      // setTimeout( ()=> this.mqttClientService.topic().subscribe(), 1000);
    }, 100)

  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
    // (document.getElementById('map-container') as HTMLElement).innerHTML = '';
  }

  switchMap() { this.leafletMapService.switchMap(this.map) }
  zoomToDevices() { this.leafletMapService.zoomToDevices(this.map) }
  toggleBeaconMap() {this.leafletMapService.toggleBeaconMap(this.map) }

}
