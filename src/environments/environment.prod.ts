export const environment = {
  production: true
};

export const CONFIG:any = {

  // api_url: 'https://nano-things.net/abeemap-api/v100/api',
  // sso_api_url: 'https://nano-things.net/sso-api/v100/api',

  authorizationUrl: 'https://nano-things.net/abeemap/login',
  ////// authorizationUrl: '/dev/abeemap/login',
  // authorizationUrl: 'https://abeemap.s3.eu-central-1.amazonaws.com/index.html',
  // authorizationUrl: 'https://2r7c7pjlmc.execute-api.eu-central-1.amazonaws.com/dev/abeemap/login',
  // authorizationUrl: 'http://' + window.location.hostname + '/login',
  // authorizationUrl: '/login',

  response_type: 'token',

  redirect_uri: 'https://nano-things.net/abeemap',
  ////// redirect_uri: '/dev/abeemap',
  // redirect_uri: 'https://abeemap.s3.eu-central-1.amazonaws.com/index.html',
  // redirect_uri: 'https://2r7c7pjlmc.execute-api.eu-central-1.amazonaws.com/dev/abeemap',
  // redirect_uri: '/',

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
    // 'community-api':       'http://localhost:8080'
    // 'community-api':       'https://nano-things.net/abeemap_api'

    'poc-api':             'https://nano-things.net/abeemap_api',
    'dev1-api':            'https://nano-things.net/abeemap_api',
    'tpe-eu-preprod-api':  'https://nano-things.net/abeemap_api',
    'iot-api':             'https://nano-things.net/abeemap_api',
    'tpe-eu-api':          'https://nano-things.net/abeemap_api',
    'community-api':       'https://nano-things.net/abeemap_api',
  },
  DXAPI_DEFAULT_PREFIX: 'community-api',

  ADM_URL: "https://dev1.preview.thingpark.com/abeeway-device-analyzer-new/index.php",

  DEFAULT_MAP_CENTER: [11.6739826, 47.0622886],
  DEFAULT_MAP_ZOOM: 5

};

// ng build --build-optimizer --base-href /abeemap/

// rm /home/user/apps/html/abeemap/*
// cp /home/user/devs/abeemap/dist/* /home/user/apps/html/abeemap/
// sudo chcon -v -R --type=httpd_sys_content_t /home/user/apps/html
