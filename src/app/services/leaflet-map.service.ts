import { Injectable, OnInit } from '@angular/core';

import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextareaDialogComponent } from '../components/textarea-dialog/textarea-dialog.component'
import { DxLocationApiService } from './dx-location-api.service';

import { MqttClientService } from './mqtt-client.service';

// import { IMqttMessage } from 'ngx-mqtt';

import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

import { Inject, Injector }  from '@angular/core';
import { DOCUMENT } from '@angular/common'

import { BeaconSettingsPopupComponent } from '../components/beacon-settings-popup/beacon-settings-popup.component';

// import { MqttClientService } from './mqtt-client.service';

const ICONS_FOLDER = './assets/';

const ICON_BLUE = L.icon({
  iconRetinaUrl: ICONS_FOLDER + 'marker-icon-blue-2x.png',
  iconUrl: ICONS_FOLDER + 'marker-icon-blue.png',
  shadowUrl: ICONS_FOLDER + 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [1, 0],
  shadowSize: [41, 41]
});

const ICON_RED = L.icon({
  iconRetinaUrl: ICONS_FOLDER + 'marker-icon-red-2x.png',
  iconUrl: ICONS_FOLDER + 'marker-icon-red.png',
  shadowUrl: ICONS_FOLDER + 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [1, 0],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = ICON_RED;

const TILES_OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 3,
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const TILES_MAPBOX = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  minZoom: 3,
  maxZoom: 23,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
});

const TILES_GOOGLE_SAT = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  minZoom: 3,
  maxZoom: 23,
  subdomains:['mt0','mt1','mt2','mt3']
});

const DEFAULT_TPXLE_UL_TEXT = JSON.stringify(
  { "coordinates": [ 0, 0, 0 ] },
  null,
  4
);
const DEFAULT_GEOJSON_TEXT = JSON.stringify(
  {
    "type": "FeatureCollection",
    "features": []
  },
  null, 4
);





@Injectable({
  providedIn: 'root'
})
export class LeafletMapService implements OnInit{

  beaconsFeatureGroup = L.featureGroup();
  devicesFeatureGroup = L.featureGroup();
  devices:any = {};
  
  geojsonFile:any;

  // document.getElementById('tpxle-ul-textarea').value = defaultTpxleUlText;
  tpxleULTextarea = DEFAULT_TPXLE_UL_TEXT;

  // document.getElementById('geojsonTextarea').value = defaultGeojsonText;
  geojsonTextarea = DEFAULT_GEOJSON_TEXT


  constructor(
    @Inject(DOCUMENT) document:any,
    injector: Injector,
    private dxLocationApiService: DxLocationApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private mqttClientService: MqttClientService
  ) {

    if (!customElements.get('app-beacon-settings-popup')) {
      // Convert `BeaconSettingsPopupComponent` to a custom element.
      const BeaconSettingsPopupElement = createCustomElement(BeaconSettingsPopupComponent, {injector});
      // Register the custom element with the browser.
      customElements.define('app-beacon-settings-popup', BeaconSettingsPopupElement);
    }

  }

  ngOnInit(): void {
    this.mqttClientService.locationUpdateMessage$.subscribe( (msg) => this.updateDeviceMarker(msg) );
    this.getBluetoothMap();
  }


  updateDeviceMarker(msg:any) {
    if (this.devices[msg.deviceEUI]) {
      this.devices[msg.deviceEUI].setLatLng([msg.coordinates[1], msg.coordinates[0]]).update();
    } else {
      this.devices[msg.deviceEUI] = L.marker([msg.coordinates[1], msg.coordinates[0]], {
        icon: ICON_RED,
        pmIgnore: true
      });
      this.devices[msg.deviceEUI].bindPopup(`DevEUI: ${msg.deviceEUI}<br />Time: ${msg.time}`).addTo(this.devicesFeatureGroup);
    }
  }

  initDeviceMap(map:any): void {
 
    map.addLayer(TILES_MAPBOX);
    map.addLayer(this.devicesFeatureGroup);

    this.zoomToDevices(map);

  }

  zoomToDevices(map:any) {
    map.fitBounds(this.devicesFeatureGroup.getBounds(), {padding: [50, 50]});
  }

  initBeaconMap(map:any): void {
 
    map.addLayer(TILES_MAPBOX);
    map.addLayer(this.beaconsFeatureGroup);

    this.zoomToBeacons(map);

  }

  zoomToBeacons(map:any) {
    map.fitBounds(this.beaconsFeatureGroup.getBounds(), {padding: [50, 50]});
  }

  initGeoman(map:any) {
    map.pm.addControls({  
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,  
        drawCircle: false,
        drawPolyline: false,
        rotateMode: true,
        cutPolygon: false,
        snappingOption: true,
    });  
    map.pm.setGlobalOptions({ 
      snappable: false,
      layerGroup: this.beaconsFeatureGroup
    });

    // setTimeout( () =>  TILES_MAPBOX.addTo(map), 1000);

    map.on('pm:create', (e:any) => { // e.shape, e.layer
      this.setupLayer(e.layer, 'Beacon-XX', '00:00:00:00:00:00', '');
      this.onExport();
    });

    // this.currentLocationMarker.addTo(map);

    let blueMarker = map.pm.Toolbar.copyDrawControl('drawMarker',{name: "beaconMarker"})
    blueMarker.drawInstance.setOptions({markerStyle: {icon : ICON_BLUE}, snappable: false});
    
    // let redMarker = map.pm.Toolbar.copyDrawControl('drawMarker',{name: "currentLocationMarker"})
    // redMarker.drawInstance.setOptions({markerStyle: {icon : ICON_RED}});
  }
  


  switchMap(map:any) {
    if (map.hasLayer(TILES_MAPBOX)) {
      map.addLayer(TILES_GOOGLE_SAT);
      map.removeLayer(TILES_MAPBOX);
    } else {
      map.addLayer(TILES_MAPBOX);
      map.removeLayer(TILES_GOOGLE_SAT);
    }
  };

  toggleBeaconMap(map:any) {
    if (map.hasLayer(this.beaconsFeatureGroup)) {
      map.removeLayer(this.beaconsFeatureGroup);
    } else {
      map.addLayer(this.beaconsFeatureGroup);
    }
  };

  createPopupFunction(leafletId:any, name:any, mac:any, id:any) {
    return (layer:any) => {
      const popupEl: NgElement & WithProperties<BeaconSettingsPopupComponent> = document.createElement('app-beacon-settings-popup') as any;
      popupEl.params = { leafletId, name, mac, id };
      // Listen to the close event
      // popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
      popupEl.addEventListener('changed', (e:any) => {
        this.onMarkerChange(e.detail.leafletId, e.detail.name, e.detail.mac, e.detail.id);
      });
      // Add to the DOM
      document.body.appendChild(popupEl);
      return popupEl;
    }
  }


  setupLayer (l:any, name:string, mac:string, id:string) {
    // L.PM.reInitLayer(l);
    // l.on('pm:edit', ({ layer }) => {
    l.on('pm:edit', () => {
        this.onExport();
    });
    const leafletId = l._leaflet_id;
    if (l instanceof L.Marker) {
      // l.setIcon(ICON_RED);
      (l as any).feature = {
        type: "Feature",
        properties: {
          name: name,
          mac: mac,
          id: id,
        }
      };
      l.bindPopup(this.createPopupFunction(leafletId, name, mac, id) as any);
    };

  };

  updateMarker (leafletId:any, name:string, mac:string, id:string) {
    const m:any = this.beaconsFeatureGroup.getLayer(leafletId);
    m.feature.properties.name = name;
    m.feature.properties.mac = mac;
    m.feature.properties.id = id;
    m.getPopup().setContent(this.createPopupFunction(leafletId, name, mac, id) as any);
    m.getPopup().update();
  }

  onMarkerChange(leafletId:any, name:string, mac:string, id:string) {
    this.updateMarker(leafletId, name, mac, id);
    this.onExport();
  }

  clearBeaconMap() {
    this.beaconsFeatureGroup.eachLayer( (layer) => {
      this.beaconsFeatureGroup.removeLayer(layer);
    })
  }

  importFeatures(features:any) { 
    let group:any = [];
    try {

      L.geoJSON(features, { 
        snapIgnore: true,
        onEachFeature: (feature, layer) => {

          if ((feature.geometry.type == 'Point') && (layer instanceof L.Marker) ) { 

            layer.setIcon(ICON_BLUE);

            if (feature.properties === undefined) throw new Error('Missing "properties" property from "feature"!');
            if (feature.properties.name === undefined) throw new Error('Missing "name" property from "properties"!');
            if ((feature.properties.mac === undefined) && (feature.properties.id === undefined)) throw new Error('Either "mac" or "id" property must be specified in "properties"!');
            if ((feature.properties.mac !== '') && (feature.properties.id !== '')) throw new Error('Either "mac" or "id" properties must be specified. It is not allowed to define both!');
            
          }
          // group.push({layer: layer, name: feature.properties.name, mac: feature.properties.mac});
          group.push([layer, feature.properties.name, feature.properties.mac || '', feature.properties.id] || '');
        }
      });

      this.clearBeaconMap();
      group.forEach( (element:[any,string,string,string]) => {
        element[0].addTo(this.beaconsFeatureGroup);
        this.setupLayer(...element);
      });

      // element[0], element[1], element[2]
      // A spread argument must either have a tuple type or be passed to a rest parameter.

    } catch(error:any) {
      this.reportError(error);
    }

  }


  getBluetoothMap() {

    this.dxLocationApiService.getBluetoothMap().subscribe(
      (features:any) => this.importFeatures(features),
      (error:any) => {
        this.reportError(error);
      }
    );

  }

  deleteBluetoothMap() {
    this.dxLocationApiService.deleteBluetoothMap().subscribe(
      (result:any) => {
        console.log(JSON.stringify(result));
      },
      (error:any) => { 
        this.reportError(error);
      }
    )
  }

  delsetBluetoothMap() {
    this.dxLocationApiService.deleteBluetoothMap().subscribe(
      (result:any) => {
        this.setBluetoothMap();
      },
      (error:any) => { console.log(error);
        if (error.error.code == 404) {
          this.setBluetoothMap();
        } else {
          this.reportError(error);
        }        
      }
    )
  }

  setBluetoothMap() {
    this.dxLocationApiService.setBluetoothMap(this.beaconsFeatureGroup.toGeoJSON()).subscribe(
      (result:any) => {
        console.log(JSON.stringify(result));
      },
      (error:any) => {
        this.reportError(error);
      }
    );
  }

  onExport() {

  }

  exportMap(map:any) {
    // this.geojsonTextarea = JSON.stringify(this.beaconsFeatureGroup.toGeoJSON(), null, 4);
    // alert(JSON.stringify(this.beaconsFeatureGroup.toGeoJSON(), null, 4));
    this.openDialog(JSON.stringify(this.beaconsFeatureGroup.toGeoJSON(), null, 4), map)
  }

  openDialog(geoJsonText:string, map:any): void {
    const dialogRef = this.dialog.open(TextareaDialogComponent, {
      width: '400px',
      height: '500px',
      data: {title: "Please edit the GeoJSON content here!", inputText: geoJsonText}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result) {
        try {
          let features = JSON.parse(result);
          this.importFeatures(features);
        }
        catch(error:any) {
          this.reportError(error);
        }
      }
    });
  }

  reportError(error:any) {
    this.snackBar.open(
      'ERROR: ' + JSON.stringify(error.error),
      'x', {
        panelClass: ['red-snackbar'],
      }
    );       
  }






}
