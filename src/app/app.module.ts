import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ConnectorConfigsComponent } from './components/connector-configs/connector-configs.component';
import { BinderConfigsComponent } from './components/binder-configs/binder-configs.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { BluetoothMapComponent } from './components/bluetooth-map/bluetooth-map.component';
import { BeaconSettingsPopupComponent } from './components/beacon-settings-popup/beacon-settings-popup.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { TextareaDialogComponent } from './components/textarea-dialog/textarea-dialog.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { BinderConfigComponent } from './components/binder-config/binder-config.component';
import { ConnectorConfigComponent } from './components/connector-config/connector-config.component';

// import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ConnectorConfigsComponent,
    BinderConfigsComponent,
    UserComponent,
    LoginComponent,
    BluetoothMapComponent,
    BeaconSettingsPopupComponent,
    TextareaDialogComponent,
    IntegrationsComponent,
    AlertDialogComponent,
    BinderConfigComponent,
    ConnectorConfigComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,

    // LeafletModule,
    
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    AppMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
