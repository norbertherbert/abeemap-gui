export const environment = {
  production: false
};

export const CONFIG:any = {

  nitURL: 'https://nano-things.net/tpxle-nit',
 
  authorizationUrl: 'http://localhost:4200/login',
  // authorizationUrl: 'https://nano-things.net/abeemap/login',
  response_type: 'token',
  redirect_uri: 'http://localhost:4200',
  // redirect_uri: 'https://nano-things.net/abeemap',
  client_id: 'abeemap',
  scope: 'sso_user abeemap_user',

  DXAPI_URL: 'http://localhost:8080',
  DXAPI_PROFILE: 'community-api',

  // ADM_URL: "https://dev1.preview.thingpark.com/abeeway-device-analyzer-new/index.php", // Platform specific
  ADM_URL: "https://dev1.thingpark.com/thingpark/abeewayDeviceAnalyzer/index.php", // Platform specific

  DEFAULT_MAP_CENTER: [11.6739826, 47.0622886],
  DEFAULT_MAP_ZOOM: 5,

  // MQTT_BROKER: 'nano-things.net',
  MQTT_BROKER: 'mqtt.preview.thingpark.com',
	MQTT_WEBSICKET_PROTOCOL: "wss",
  MQTT_WEBSOCKET_PATH: 'mqtt',
  MQTT_PORT: '880', // for wss
  MQTT_CLIENT_ID_PREFIX: 'abeemap-gui_',
  MQTT_TOPIC: "LE/dev1/AS/#", // Platform specific

};

// ng build --prod --build-optimizer --base-href /abeemap/
