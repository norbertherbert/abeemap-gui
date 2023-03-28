import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

// import { Inject }  from '@angular/core';
// import { DOCUMENT } from '@angular/common';

import * as L from 'leaflet';
import 'leaflet.fullscreen';
// import '@geoman-io/leaflet-geoman-free';

import { LeafletMapService } from '../../services/leaflet-map.service';

import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-bluetooth-map',
  templateUrl: './bluetooth-map.component.html',
  styleUrls: ['./bluetooth-map.component.css']
})
export class BluetoothMapComponent implements OnInit, AfterViewInit, OnDestroy {

  private map: any;

  constructor(
    // @Inject(DOCUMENT) document:any,
    private leafletMapService: LeafletMapService,
    private dialog: MatDialog,
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
      this.leafletMapService.initBluetoothMap(this.map);

    }, 100)

   }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
    // (document.getElementById('map-container') as HTMLElement).innerHTML = '';
  }

  getBluetoothMap() { 
    this.leafletMapService.getBluetoothMap() 
  }

  delsetBluetoothMap() { 
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Save?',
        message: `Do you really want to overwrite the BLE Beacon Map at TPXLE?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.leafletMapService.delsetBluetoothMap() 
      }
    });
  }

  deleteBluetoothMap() {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Delete?',
        message: `Do you really want to delete the BLE Beacon Map from TPXLE?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.leafletMapService.deleteBluetoothMap() 
      }
    });
  }
  
  // switchMap() {
  //   this.leafletMapService.switchMap(this.map) 
  // }
  
  clearMap() {
    this.leafletMapService.clearBeaconMap()
  }
  
  exportMap() {
    this.leafletMapService.exportMap(this.map)
  }

  zoomToBeacons() {
    this.leafletMapService.zoomToBeacons(this.map)
  }

}
