# AbeeMap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



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
