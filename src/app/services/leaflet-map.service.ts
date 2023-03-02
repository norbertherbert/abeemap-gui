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
import 'leaflet.marker.slideto';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';




import { Inject, Injector }  from '@angular/core';
import { DOCUMENT } from '@angular/common'

import { BeaconSettingsPopupComponent } from '../components/beacon-settings-popup/beacon-settings-popup.component';
import { createInjectableDefinitionMap } from '@angular/compiler/src/render3/partial/injectable';

// import { MqttClientService } from './mqtt-client.service';






const DEVICE_NAMES = {
  '20635f0281000140':	['JY', 'Actility'],
  '20635f028100014d':	['MH', 'Actility'],
  '20635f0281000152':	['CY', 'Actility'],
}






const ICONS_FOLDER = './assets/';

const ICON_BLE_BEACON = L.icon({
  // iconRetinaUrl: ICONS_FOLDER + 'bluetooth.png',
  iconUrl: ICONS_FOLDER + 'bluetooth.png',
  shadowUrl: ICONS_FOLDER + 'bluetooth-shadow.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -15],
  tooltipAnchor: [0, 16],
  shadowSize: [30, 20],
  shadowAnchor: [10, 20]
});

const ICON_PERSON = L.icon({
  iconRetinaUrl: ICONS_FOLDER + 'marker-icon-person-2x.png',
  iconUrl: ICONS_FOLDER + 'marker-icon-person-1x.png',
  shadowUrl: ICONS_FOLDER + 'marker-icon-person-shadow.png',
  iconSize: [24, 33],
  iconAnchor: [12, 33],
  popupAnchor: [1, -24],
  tooltipAnchor: [0, 6],
  shadowSize: [36, 33],
  shadowAnchor: [12, 33],
});

const ICON_PERSON_YELLOW = L.icon({
  iconRetinaUrl: ICONS_FOLDER + 'marker-icon-person-yellow-2x.png',
  iconUrl: ICONS_FOLDER + 'marker-icon-person-yelllow-1x.png',
  shadowUrl: ICONS_FOLDER + 'marker-icon-person-shadow.png',
  iconSize: [24, 33],
  iconAnchor: [12, 33],
  popupAnchor: [1, -24],
  tooltipAnchor: [0, 6],
  shadowSize: [36, 33],
  shadowAnchor: [12, 33],
});

const ICON_PERSON_GREY = L.icon({
  iconRetinaUrl: ICONS_FOLDER + 'marker-icon-person-grey-2x.png',
  iconUrl: ICONS_FOLDER + 'marker-icon-person-grey-1x.png',
  shadowUrl: ICONS_FOLDER + 'marker-icon-person-shadow.png',
  iconSize: [24, 33],
  iconAnchor: [12, 33],
  popupAnchor: [1, -24],
  tooltipAnchor: [0, 6],
  shadowSize: [36, 33],
  shadowAnchor: [12, 33],
});

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




const TILES_MAPBOX = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  minZoom: 3,
  maxZoom: 23,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
});

const TILES_OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 3,
  maxZoom: 23,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const TILES_GOOGLE_STREETS = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
  minZoom: 3,
  maxZoom: 23,
  subdomains:['mt0','mt1','mt2','mt3']
});

const TILES_GOOGLE_SAT = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  minZoom: 3,
  maxZoom: 23,
  subdomains:['mt0','mt1','mt2','mt3']
});

const TILES_GOOGLE_HYBRID = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
  minZoom: 3,
  maxZoom: 23,
  subdomains:['mt0','mt1','mt2','mt3']
});

const baseLayers = {
  'OpenStreetMap': TILES_OSM,
  'Google Streets': TILES_GOOGLE_STREETS,
  'Google Sat': TILES_GOOGLE_SAT,
  'Google Hybrid': TILES_GOOGLE_HYBRID,
};



const FLOORPLAN_IMAGE_URL_01 = './assets/actility_floorplan.png';
const imageCoordinatesX_01 = 2.3335;
const imageCoordinatesY_01 = 48.8745900;
const imageHeight_01 = 0.00029;
const imageWidth_01 = 0.00057;
const FLOORPLAN_IMAGE_BOUNDS_01:any = [
  [imageCoordinatesY_01, imageCoordinatesX_01], 
  [imageCoordinatesY_01+imageHeight_01, imageCoordinatesX_01+imageWidth_01]
];

const FLOORPLAN_IMAGE_URL_02 = './assets/orlando_hotel_floor_plan.png';
const imageCoordinatesX_02 = -81.46062;
const imageCoordinatesY_02 = 28.480985;
const imageHeight_02 = 0.000936;
const imageWidth_02 = 0.00115;
const FLOORPLAN_IMAGE_BOUNDS_02:any = [
  [imageCoordinatesY_02, imageCoordinatesX_02], 
  [imageCoordinatesY_02+imageHeight_02, imageCoordinatesX_02+imageWidth_02]
];

const floorplanImages = L.layerGroup([
  L.imageOverlay(FLOORPLAN_IMAGE_URL_01, FLOORPLAN_IMAGE_BOUNDS_01),
  L.imageOverlay( FLOORPLAN_IMAGE_URL_02, FLOORPLAN_IMAGE_BOUNDS_02),
]);

const baseOverlays = {
  'Floorplan images': floorplanImages,
};


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

const searchProvider = new OpenStreetMapProvider();
const searchControl = GeoSearchControl({ 
  provider: searchProvider,
  showMarker: true,
  marker: {
    icon: ICON_RED,
    draggable: false,
  },
  position: 'topright',
});

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService implements OnInit {

  beaconsFeatureGroup = L.featureGroup();
  devicesFeatureGroup = L.featureGroup();
  devices:any = {};
  
  geojsonFile:any;

  myAudioContext: any;
  beepsEnabled = false;

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

    this.myAudioContext = new window.AudioContext();

  }

  ngOnInit(): void {
    this.mqttClientService.locationUpdateMessage$.subscribe( (msg) => {
      this.updateDeviceMarker(msg);
    });
    this.getBluetoothMap();
  }


  updateDeviceMarker(msg:any) {

    let icon:any;
    
    // if ((DEVICE_NAMES as any)[msg.deviceEUI]) {

      if (this.devices[msg.deviceEUI]) {
        // this.devices[msg.deviceEUI].setLatLng([msg.coordinates[1], msg.coordinates[0]]).update();

        if (this.beepsEnabled) {
          this.beep(100, 440, 1);
        }

        if (msg.age > 120) {
          icon = ICON_PERSON_GREY;
        // } else if ( (DEVICE_NAMES as any)[msg.deviceEUI][1] == 'LoRa Alliance' ) {
        //   icon = ICON_PERSON_YELLOW;
        } else {
          icon = ICON_PERSON;
        }
        this.devices[msg.deviceEUI].setIcon(icon);

        this.devices[msg.deviceEUI].slideTo( [msg.coordinates[1], msg.coordinates[0]], {
          duration: 2000,
          keepAtCenter: false
        });

      } else {

        const t = ( (new Date()).getTime() - (new Date(msg.time)).getTime() ) / 1000;
        if (t>300) {
          icon = ICON_PERSON_GREY;
        // } else if ( (DEVICE_NAMES as any)[msg.deviceEUI][1] == 'LoRa Alliance' ) {
        //   icon = ICON_PERSON_YELLOW;
        } else {
          icon = ICON_PERSON;
        }

        this.devices[msg.deviceEUI] = L.marker([msg.coordinates[1], msg.coordinates[0]], {
          icon,
          pmIgnore: true,
          zIndexOffset: 1000,
          // title: msg.deviceEUI,
        });
        this.devices[msg.deviceEUI].bindPopup(`DevEUI: ${msg.deviceEUI}<br />Time: ${msg.time}`).addTo(this.devicesFeatureGroup);
        this.devices[msg.deviceEUI].bindTooltip(
          (DEVICE_NAMES as any)[msg.deviceEUI] ? (DEVICE_NAMES as any)[msg.deviceEUI][0] : msg.deviceEUI.substring(12), 
          // msg.deviceEUI.substring(12),
          {
            permanent: true, 
            opacity: 0.75,
            direction: 'bottom',
            className: 'marker-tooltip'
          }
        ).openTooltip();
      }
    // }
  }


  initMap(map:any) {

    map.addLayer(TILES_OSM);
    map.addLayer(floorplanImages);
    map.addLayer(this.devicesFeatureGroup);
    // map.addLayer(this.beaconsFeatureGroup);
    map.fitBounds(FLOORPLAN_IMAGE_BOUNDS_02, {padding: [150, 150]});
    
    map.addControl(
      L.control.layers(baseLayers, {
        'People': this.devicesFeatureGroup,
        'Beacon map': this.beaconsFeatureGroup,
        ...baseOverlays
      })
    );

    map.addControl(searchControl);

  }


  initBluetoothMap(map:any) {

    map.addLayer(TILES_OSM);
    map.addLayer(floorplanImages);
    // map.addLayer(this.devicesFeatureGroup);
    map.addLayer(this.beaconsFeatureGroup);
    map.fitBounds(FLOORPLAN_IMAGE_BOUNDS_02, {padding: [150, 150]});
    
    map.addControl(
      L.control.layers(baseLayers, {
        // 'Markers': this.devicesFeatureGroup,
        // 'Beacon map': this.beaconsFeatureGroup,
        ...baseOverlays
      })
    );

    this.initGeoman(map);

    map.addControl(searchControl);

  }

  zoomToFloorplan01(map:any) {
    map.fitBounds(FLOORPLAN_IMAGE_BOUNDS_01, {padding: [150, 150]});
    // map.flyToBounds(FLOORPLAN_IMAGE_BOUNDS_01, {padding: [150, 150]});
  }

  zoomToFloorplan02(map:any) {
    map.fitBounds(FLOORPLAN_IMAGE_BOUNDS_02, {padding: [150, 150]});
    // map.flyToBounds(FLOORPLAN_IMAGE_BOUNDS_02, {padding: [150, 150]});
  }
  
  zoomToBeacons(map:any) {
    map.fitBounds(this.beaconsFeatureGroup.getBounds(), {padding: [150, 150]});
    // map.flyToBounds(this.beaconsFeatureGroup.getBounds()) // , {padding: [50, 50]});
  }

  zoomToDevices(map:any) {
    map.fitBounds(this.devicesFeatureGroup.getBounds(), {padding: [150, 150]});
    // map.flyToBounds(this.devicesFeatureGroup.getBounds(), {padding: [150, 150]});
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
      this.setupLayer(e.layer, 'Bcn-XX', '00:00:00:00:00:00', '');
      this.onExport();
    });

    // this.currentLocationMarker.addTo(map);

    let blueMarker = map.pm.Toolbar.copyDrawControl('drawMarker',{name: "beaconMarker"})
    blueMarker.drawInstance.setOptions({markerStyle: {icon : ICON_BLE_BEACON}, snappable: false});
    
    // let redMarker = map.pm.Toolbar.copyDrawControl('drawMarker',{name: "currentLocationMarker"})
    // redMarker.drawInstance.setOptions({markerStyle: {icon : ICON_RED}});
  }


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
      l.bindTooltip(
        name, 
        {
          permanent: true, 
          opacity: 0.5,
          direction: 'bottom',
          className: 'beacon-tooltip'
        }
      ).openTooltip();
    };

  };

  updateMarker (leafletId:any, name:string, mac:string, id:string) {
    const m:any = this.beaconsFeatureGroup.getLayer(leafletId);
    m.feature.properties.name = name;
    m.feature.properties.mac = mac;
    m.feature.properties.id = id;
    m.getPopup()
      .setContent(this.createPopupFunction(leafletId, name, mac, id) as any)
      .update();
    m.getTooltip()
      .setContent(name)
      .update();
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

            layer.setIcon(ICON_BLE_BEACON);

            if (feature.properties === undefined) throw new Error('Missing "properties" property from "feature"!');
            if (feature.properties.name === undefined) throw new Error('Missing "name" property from "properties"!');
            if ((feature.properties.mac === undefined) && (feature.properties.id === undefined)) throw new Error('Either "mac" or "id" property must be specified in "properties"!');
            if ((feature.properties.mac !== '') && (feature.properties.id !== '')) throw new Error('Either "mac" or "id" properties must be specified. It is not allowed to define both!');
            
          }

          group.push([layer, feature.properties.name, feature.properties.mac || '', feature.properties.id] || '');

          // this.setupLayer(layer, feature.properties.name, feature.properties.mac || '', feature.properties.id);
          // layer.addTo(this.beaconsFeatureGroup);

        }
      });

      this.clearBeaconMap();

      group.forEach( (element:[any,string,string,string]) => {
        element[0].addTo(this.beaconsFeatureGroup);
        this.setupLayer(...element);
      });

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
      minWidth: '400px',
      minHeight: '500px',
      data: {title: "Please edit the GeoJSON content here!", inputText: geoJsonText},
      panelClass: 'custom-mat-dialog-panel'
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


  beep(duration:number, frequency:number, volume:number){

    return new Promise<void>((resolve, reject) => {
      // Set default duration if not provided
      duration = duration || 200;
      frequency = frequency || 440;
      volume = volume || 100;

      try{
          let oscillatorNode = this.myAudioContext.createOscillator();
          let gainNode = this.myAudioContext.createGain();
          oscillatorNode.connect(gainNode);

          // Set the oscillator frequency in hertz
          oscillatorNode.frequency.value = frequency;

          // Set the type of oscillator
          oscillatorNode.type= "square";
          gainNode.connect(this.myAudioContext.destination);

          // Set the gain to the volume
          gainNode.gain.value = volume * 0.01;

          // Start audio with the desired duration
          oscillatorNode.start(this.myAudioContext.currentTime);
          oscillatorNode.stop(this.myAudioContext.currentTime + duration * 0.001);

          // Resolve the promise when the sound is finished
          oscillatorNode.onended = () => {
              resolve();
          };
      }catch(error){
          reject(error);
      }
    });

  }



}
