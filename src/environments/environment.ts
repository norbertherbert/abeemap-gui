export const environment = {
  production: false
};

export const CONFIG:any = {
 
  authorizationUrl: 'http://localhost:4200/login',
  // authorizationUrl: 'https://nano-things.net/abeemap/login',
  response_type: 'token',
  redirect_uri: 'http://localhost:4200',
  // redirect_uri: 'https://nano-things.net/abeemap',
  client_id: 'abeemap',
  scope: 'sso_user abeemap_user',

  DXAPI_URLS: {
    
    // 'poc-api':             'https://dx-api-dev1.thingpark.com',
    // 'dev1-api':            'https://dx-api-dev1.thingpark.com',
    // 'tpe-eu-preprod-api':  'https://dx-api-dev1.thingpark.com',
    // 'iot-api':             'https://dx-api.thingpark.com',
    // 'tpe-eu-api':          'https://dx-api.thingpark.com',

    // 'community-api':       'https://community.thingpark.io/thingpark/dx',
    // 'community-api':       'http://localhost:8080/thingpark/dx'
    // 'community-api':       'https://le-lab.preview.thingpark.com',
    // 'community-api':       'http://localhost:8080',

    'poc-api':             'https://nano-things.net/abeemap_api', // Platform specific
    'dev1-api':            'https://nano-things.net/abeemap_api', // Platform specific
    'tpe-eu-preprod-api':  'https://nano-things.net/abeemap_api', // Platform specific
    'iot-api':             'https://nano-things.net/abeemap_api', // Platform specific
    'tpe-eu-api':          'https://nano-things.net/abeemap_api', // Platform specific
    'community-api':       'https://nano-things.net/abeemap_api', // Platform specific

    // 'poc-api':             'https://nano-things.net/abeemap_api_preview', // Platform specific
    // 'dev1-api':            'https://nano-things.net/abeemap_api_preview', // Platform specific
    // 'tpe-eu-preprod-api':  'https://nano-things.net/abeemap_api_preview', // Platform specific
    // 'iot-api':             'https://nano-things.net/abeemap_api_preview', // Platform specific
    // 'tpe-eu-api':          'https://nano-things.net/abeemap_api_preview', // Platform specific
    // 'community-api':       'https://nano-things.net/abeemap_api_preview', // Platform specific

  },

  DXAPI_DEFAULT_PREFIX: 'community-api',

  // ADM_URL: "https://dev1.preview.thingpark.com/abeeway-device-analyzer-new/index.php", // Platform specific
  ADM_URL: "https://dev1.thingpark.com/thingpark/abeewayDeviceAnalyzer/index.php", // Platform specific

  DEFAULT_MAP_CENTER: [11.6739826, 47.0622886],
  DEFAULT_MAP_ZOOM: 5,

  MQTT_BROKER: 'nano-things.net',
	MQTT_WEBSICKET_PROTOCOL: "wss",
  MQTT_WEBSOCKET_PATH: 'mqtt',
  MQTT_PORT: '880', // for wss
  MQTT_CLIENT_ID_PREFIX: 'abeemap-gui_',
  // MQTT_TOPIC: "LE/rnd/AS/#", // Platform specific
  MQTT_TOPIC: "LE/dev1/AS/#", // Platform specific

};

// ng build --prod --build-optimizer --base-href /abeemap/







/*
//   // api_url: 'http://localhost:8083/abeemap-api/v100/api',
//   // sso_api_url: 'http://localhost:8082/sso-api/v100/api',
//   authorizationUrl: 'http://localhost:4200/login',
//   response_type: 'token',
//   redirect_uri: 'http://localhost:4200',
//   client_id: 'abeemap',
//   scope: 'sso_user abeemap_user',

//   DXAPI_URLS: {
    
//     // 'poc-api':             'https://dx-api-dev1.thingpark.com',
//     // 'dev1-api':            'https://dx-api-dev1.thingpark.com',
//     // 'tpe-eu-preprod-api':  'https://dx-api-dev1.thingpark.com',
//     // 'iot-api':             'https://dx-api.thingpark.com',
//     // 'tpe-eu-api':          'https://dx-api.thingpark.com',

//     // 'community-api':       'https://community.thingpark.io/thingpark/dx',
//     // 'community-api':       'http://localhost:8080/thingpark/dx'
//     // 'community-api':       'https://le-lab.preview.thingpark.com',
//     // 'community-api':       'http://localhost:8080',

//     'poc-api':             'https://nano-things.net/abeemap_api',
//     'dev1-api':            'https://nano-things.net/abeemap_api',
//     'tpe-eu-preprod-api':  'https://nano-things.net/abeemap_api',
//     'iot-api':             'https://nano-things.net/abeemap_api',
//     'tpe-eu-api':          'https://nano-things.net/abeemap_api',
//     'community-api':       'https://nano-things.net/abeemap_api',

//   },

//   DXAPI_DEFAULT_PREFIX: 'community-api',

//   ADM_URL: "https://dev1.preview.thingpark.com/abeeway-device-analyzer-new/index.php",

//   // Swagger-UI
//   // https://dx-api.preview.thingpark.com/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json
//   // https://nano-things.net/abeemap_api/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json


//   // https://community.thingpark.io/thingpark/dx/admin/latest/api/oauth/token?renewToken=false&validityPeriod=12hours
//   // https://le-lab.preview.thingpark.com/admin/latest/api/oauth/token?renewToken=true&validityPeriod=7days

//   DEFAULT_MAP_CENTER: [11.6739826, 47.0622886],
//   DEFAULT_MAP_ZOOM: 5,

//   // AS_URL: https://dev1.preview.thingpark.com/community-operator-interface/?TPXLE_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTk0NDg0MDEsInN1YiI6IjEwMDAwMTE4MCJ9.HI10wFygtGvZvkE7gWAyrRD00DWlvF5f6cwK30-tbs8
//   // AS_AUTH_KEY: 4226452948404D635166546A576E5A72

//   /*
//   curl -X POST "https://le-lab.preview.thingpark.com/admin/latest/api/oauth/token?renewToken=true&validityPeriod=7days" 
//   -H "accept: application/json" 
//   -H "Content-Type: application/x-www-form-urlencoded" 
//   -d "grant_type=client_credentials&client_id=community-api%2Fnorbert.herbert%2Bcmty%40actility.com&client_secret=n0Rabab%401234"
//   */
  
//   // curl -X GET "https://le-lab.preview.thingpark.com/location-alarm-config/latest/api/bluetoothMap" 
//   // -H "accept: */*" 
//   // -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJTVUJTQ1JJQkVSOjIxNjciXSwiZXhwIjoxNjM2OTY1MDQ3LCJqdGkiOiJlMWZiODk4OC1hYTMzLTQ2N2YtOGFhYi1hOGY1NjQ0N2UzM2UiLCJjbGllbnRfaWQiOiJjb21tdW5pdHktYXBpL25vcmJlcnQuaGVyYmVydCtjbXR5QGFjdGlsaXR5LmNvbSJ9.Yn9Qid0J6mVa6L2EvFqBnW8XE2LgGadp2hNPKMQy3IuitZb6F4kmb1llGrd0UNv97p5UjBZGToDeaBNYtR0htA"

//   MQTT_BROKER: 'nano-things.net',
// 	MQTT_WEBSICKET_PROTOCOL: "wss",
//   MQTT_WEBSOCKET_PATH: 'mqtt',
//   MQTT_PORT: '880', // for wss
//   MQTT_CLIENT_ID_PREFIX: 'abeemap-gui_',
//   // MQTT_TOPIC: "LE/le-lab/AS/#",
//   MQTT_TOPIC: "LE/rnd/AS/#",

// };


// ng build --prod --build-optimizer --base-href /abeemap/





