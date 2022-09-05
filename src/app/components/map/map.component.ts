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
  beepsEnabled: boolean;

  constructor(
    // @Inject(DOCUMENT) document:any,
    private leafletMapService: LeafletMapService,
    // private mqttClientService: MqttClientService,
  ) {
    this.beepsEnabled = false;
    this.leafletMapService.beepsEnabled = false;
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 

    // (document.getElementById('map-container') as HTMLElement).innerHTML = "<div id='map' style='width: 100%; height: 100%; z-index: 5;'></div>";

    setTimeout( () => {
      this.map = L.map('map', {
        zoomSnap: 0,
        center: [ 25, 0 ],
        zoom: 3,
      });

      this.leafletMapService.initFloorplanImage(this.map);
      this.leafletMapService.initBeaconMap(this.map);
      this.leafletMapService.initDeviceMap(this.map);
      this.leafletMapService.zoomToBeacons(this.map);
      // this.leafletMapService.initGeoman(this.map);
    }, 300)

  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
    // (document.getElementById('map-container') as HTMLElement).innerHTML = '';
  }

  switchMap() { this.leafletMapService.switchMap(this.map) }
  zoomToActilityFloorplan() { 
    this.leafletMapService.zoomToActilityFloorplan(this.map) 
  }

  zoomToFloorplan01() { 
    this.leafletMapService.zoomToFloorplan01(this.map) 
  }

  zoomToBeacons() {
    this.leafletMapService.zoomToBeacons(this.map)
  }

  toggleBeaconMap() {this.leafletMapService.toggleBeaconMap(this.map) }
  updateBeepsEnabled() {
    this.leafletMapService.beepsEnabled = this.beepsEnabled; 
  }

}
