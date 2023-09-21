export const environment = {
  production: false
};

//const ECOKC_API_BASE_URL = 'https://abeeway-mobile-app-eco.thingpark.com';
const ECOKC_API_BASE_URL = 'https://nano-things.net/abeemap_api_kc';

// const ECODX_API_BASE_URL = 'https://dx-api.thingpark.io';
const ECODX_API_BASE_URL = 'https://nano-things.net/abeemap_api';

// const PREVKC_API_BASE_URL = 'https://le-lab.preview.thingpark.com';
const PREVKC_API_BASE_URL = 'https://nano-things.net/abeemap_api_preview_kc';

// const PREVDX_API_BASE_URL = 'https://dx-api.preview.thingpark.com';
const PREVDX_API_BASE_URL = 'https://nano-things.net/abeemap_api_preview';


export const CONFIG:any = {

  nitURL: 'https://nano-things.net/tpxle-nit',
 
  authorizationUrl: 'http://localhost:4200/login',
  // authorizationUrl: 'https://nano-things.net/abeemap/login',
  response_type: 'token',
  redirect_uri: 'http://localhost:4200',
  // redirect_uri: 'https://nano-things.net/abeemap',
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

  DX_LOCATION_API: `${PREVDX_API_BASE_URL}/location/latest/api`,


  /********************************************/
  /* Ecosystem_TPXLE with Ecosystem_Keycloak  */
  /********************************************/
  ECOKC: {
    PUBLISHED_NIT_URL: "https://community.thingpark.io/tpxle-nit",
    API_BASE_URL: ECOKC_API_BASE_URL,
    SWAGGER_UI: `${ECOKC_API_BASE_URL}/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json`,
    FEED_URL: `${ECOKC_API_BASE_URL}/location/latest/api/feeds`,
    TOKEN_REQUEST_URL: `${ECOKC_API_BASE_URL}/auth`,
    // APIKEY_MGMT_URL: `${ECOKC_API_BASE_URL}/location-key-management/latest/api/apiKeys`,
    OPERATOR_ID: "actility-tpe-ope",
    GRANT_TYPE: "password",
    REALM: "abeeway-mobile-app",
    SCOPE: "openid",
    CLIENT_ID: "tpx-le-nit",
  },
  
  /*********************************************/
  /* Ecosystem_TPXLE with Ecosystem_DxAdminAPI */
  /*********************************************/
  ECODX: {
    PUBLISHED_NIT_URL: "https://community.thingpark.io/tpxle-nit",
    API_BASE_URL: ECODX_API_BASE_URL,
    SWAGGER_UI: `${ECODX_API_BASE_URL}/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json`,
    FEED_URL: `${ECODX_API_BASE_URL}/location/latest/api/feeds`,
    TOKEN_REQUEST_URL: `${ECODX_API_BASE_URL}/admin/latest/api/oauth/token`,
    // APIKEY_MGMT_URL: `${ECODX_API_BASE_URL}/location-key-management/latest/api/apiKeys`,
    OPERATOR_ID: "actility-tpe-ope",
    GRANT_TYPE: "client_credentials",
  },
  
  /*********************************************/
  /* Preview_TPXLE with Preview_Keycloak       */
  /*********************************************/
  PREVKC: {
    PUBLISHED_NIT_URL: "https://community.thingpark.io/tpxle-nit",
    API_BASE_URL: PREVKC_API_BASE_URL,
    SWAGGER_UI: `https://nano-things.net/abeemap_api_preview_kc/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json`,
    FEED_URL: `${PREVKC_API_BASE_URL}/location/latest/api/feeds`,
    TOKEN_REQUEST_URL: `${PREVKC_API_BASE_URL}/auth`,
    TOKEN_REQUEST_UR1: `${PREVKC_API_BASE_URL}/auth/realms/le-lab/protocol/openid-connect/token`,
    AUTHORIZATION_URL: `${PREVKC_API_BASE_URL}/auth/realms/le-lab/protocol/openid-connect/auth`,
    APIKEY_MGMT_URL: `${PREVKC_API_BASE_URL}/location-key-management/latest/api/apiKeys`,
    OPERATOR_ID: "dev-ope",
    GRANT_TYPE: "password",
    REALM: "le-lab",
    SCOPE: "openid",
    CLIENT_ID: "tpx-le-nit",
  },
  /*********************************************/
  /* Preview_TPXLE with Preview_DxAdminAPI     */
  /*********************************************/
  PREVDX: {
    PUBLISHED_NIT_URL: "https://community.thingpark.io/tpxle-nit",
    API_BASE_URL: PREVDX_API_BASE_URL,
    SWAGGER_UI: `${PREVDX_API_BASE_URL}/admin/latest/swagger-ui/index.html?shortUrl=tpdx-admin-api-contract.json`,
    FEED_URL: `${PREVDX_API_BASE_URL}/location/latest/api/feeds`,
    TOKEN_REQUEST_URL: `${PREVDX_API_BASE_URL}/admin/latest/api/oauth/token`,
    APIKEY_MGMT_URL: `${PREVDX_API_BASE_URL}/location-key-management/latest/api/apiKeys`,
    OPERATOR_ID: "dev-ope",
    GRANT_TYPE: "client_credentials"
  }

};


// ng build --build-optimizer --base-href /abeemap/
