import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { MqttClientService } from '../../services/mqtt-client.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent  implements OnInit, OnDestroy {

  title = 'AbeeMap';
  userId: string|undefined = '';

  mqttConnected = false;

  isHandset: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private mqttClientService: MqttClientService,
  ) { }

  ngOnInit() {
    this.isHandset$.subscribe( (isHandset) => {
      this.isHandset = isHandset;
    });
    this.authService.loggedIn$.subscribe( loggedIn => {
      if (loggedIn) {
        this.userId = this.authService.userId;
      } else {
        this.userId = '';
      }
    });
    this.mqttClientService.connected$.subscribe( connected => {
      if (connected) {
        this.mqttConnected = true;
      } else {
        this.mqttConnected = false;
      }
    });
  }

  ngOnDestroy() {
    this.authService.loggedIn$.unsubscribe();
  }

  sidenavClose(sidenav: any) {
    if (this.isHandset) {
      sidenav.close();
    }
  }

  login(): void {
    // this.authService.login(window.location.href);
    this.authService.login();
  }

  logout(): void {
    this.authService.deleteSession();
    this.authService.login(window.location.href);
  }

  mqttToggle() {
    if (this.mqttClientService.connected$.getValue()) {
      this.mqttClientService.disconnect();
    } else {
      this.mqttClientService.connect();
    } 
  }

}
