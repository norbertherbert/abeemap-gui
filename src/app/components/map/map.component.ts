import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.fullscreen';

import { LeafletMapService } from '../../services/leaflet-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  private map: any;

  constructor(
    public leafletMapService: LeafletMapService,
  ) {
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 

    setTimeout( () => {

      this.map = L.map('map', {
        fullscreenControl: true,
        fullscreenControlOptions: { position: 'topleft' }, 
      });
      this.leafletMapService.initMap(this.map);

    }, 300)

  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
  }

  zoomToFloorplan01() { 
    this.leafletMapService.zoomToFloorplan01(this.map) 
  }

  zoomToFloorplan02() { 
    this.leafletMapService.zoomToFloorplan02(this.map) 
  }

  zoomToBeacons() {
    this.leafletMapService.zoomToBeacons(this.map)
  }

  zoomToDevices() {
    this.leafletMapService.zoomToDevices(this.map)
  }

}
