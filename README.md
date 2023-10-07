## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build --build-optimizer --base-href /abeemap/` to build the project.  
The build artifacts will be stored in the `dist/` directory.  
The service will be available at `http://localhost:4200/abeemap`




## Setup steps
```
sudo npm install -g @angular/cli
ng new abeemap --skip-tests
cd abeemap
ng add @angular/material
ng g m app-material --flat
// edit app/app-material.module.ts and app/app.module.ts

ng g c --skip-tests --module app components/navigation
ng g c --skip-tests --module app components/home
ng g c --skip-tests --module app components/page01
ng g c --skip-tests --module app components/page02
ng g c --skip-tests --module app components/user
ng g c --skip-tests --module app components/login
ng g c --skip-tests --module app components/api-keys
// edit app/app-routing.module.ts

ng g c --skip-tests --module app components/map
ng g service --skip-tests services/leaflet-map
ng g service --skip-tests services/mqtt-client

ng g s --skip-tests auth/auth

ng g s --skip-tests intregrations

npm i --save jwt-decode
npm i --save @types/jwt-decode

npm i --save leaflet
npm i --save-dev @types/leaflet
npm i --save @asymmetrik/ngx-leaflet
npm i --save @geoman-io/leaflet-geoman-free

ng add @angular/elements
https://angular.io/guide/elements
https://dev.to/brsjsk/angular-custom-elements-introduction-2cen
```
