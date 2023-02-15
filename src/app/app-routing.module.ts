import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { ConnectorConfigsComponent } from './components/connector-configs/connector-configs.component';
import { ConnectorConfigComponent } from './components/connector-config/connector-config.component';
import { BinderConfigsComponent } from './components/binder-configs/binder-configs.component';
import { BinderConfigComponent } from './components/binder-config/binder-config.component';
import { ApiKeyComponent } from './components/api-key/api-key.component';
import { MapComponent } from './components/map/map.component';
import { LogsComponent } from './components/logs/logs.component';
import { BluetoothMapComponent } from './components/bluetooth-map/bluetooth-map.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'bluetooth-map',
    component: BluetoothMapComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'integrations',
    component: IntegrationsComponent,
    canActivate: [ AuthGuard ],
  },
  /*
  {
    path: 'connector-configs/create',
    component: ConnectorConfigComponent,
    canActivate: [ AuthGuard ],
  },
  */  
  {
    path: 'connector-configs/:ref',
    component: ConnectorConfigComponent,
    canActivate: [ AuthGuard ],
  },
  /*
  {
    path: 'binder-configs/create',
    component: BinderConfigComponent,
    canActivate: [ AuthGuard ],
  },
  */
  {
    path: 'binder-configs/:ref',
    component: BinderConfigComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'api-keys/:ref',
    component: ApiKeyComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
    // canActivate: [ AuthGuard ],
  },
  {
    path: '#',
    redirectTo: 'map',
    pathMatch: 'full',
    // canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [ AuthGuard ]
})
export class AppRoutingModule { }
