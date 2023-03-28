export const environment = {
  production: true
};

export const CONFIG:any = {

  nitURL: 'https://nano-things.net/tpxle-nit',
 
  // authorizationUrl: 'http://localhost:4200/login',
  authorizationUrl: 'https://nano-things.net/abeemap/login',
  response_type: 'token',
  // redirect_uri: 'http://localhost:4200',
  redirect_uri: 'https://nano-things.net/abeemap',
  client_id: 'abeemap',
  scope: 'sso_user abeemap_user',

  realm: 'rnd',
  // realm: 'dev1',

  // DXAPI_URL: 'http://localhost:8080',
  // DXAPI_URL: 'https://nano-things.net/abeemap_api',
  DXAPI_URL: 'https://nano-things.net/abeemap_api_preview',
  DXAPI_PROFILE: 'community-api',

  ADM_URL: "https://dev1.thingpark.com/thingpark/abeewayDeviceAnalyzer/index.php",

  DEFAULT_MAP_CENTER: [11.6739826, 47.0622886],
  DEFAULT_MAP_ZOOM: 5,

  // MQTT_BROKER: 'nano-things.net',
  MQTT_BROKER: 'mqtt.preview.thingpark.com',
	MQTT_WEBSOCKET_PROTOCOL: "wss",
  MQTT_WEBSOCKET_PATH: 'mqtt',
  MQTT_WSS_PORT: '880', // for wss
  MQTT_SSL_PORT: '8883',
  MQTT_CLIENT_ID_PREFIX: 'abeemap-gui_',

  DX_LOCATION_API: "https://dx-api.preview.thingpark.com/location/latest/api",

};

// ng build --build-optimizer --base-href /abeemap/
