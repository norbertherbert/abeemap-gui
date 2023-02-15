import { CONFIG } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

import {
  setCookie, getCookie, deleteCookie, generateState, getQueryParams,
} from './auth-tools.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string|undefined = undefined;

  // iss: string;
  // iat: number;
  exp: number|undefined = undefined;
  userId: string|undefined = undefined;
  scope: string|undefined = undefined;
  // customerId: number;

  // roles: string[];

  loggedIn = false;
  loggedIn$ = new BehaviorSubject<boolean>(false);
  // loggedInAsAdmin = false;

  constructor() {


    // const token = getCookie('access_token_' + CONFIG.client_id);
    const token = sessionStorage.getItem('access_token_' + CONFIG.client_id);

    if (token) {
      this.setSession(token);
    }
  }

  login(redirectURI?: string): void {
    const state = generateState();

    
    // setCookie('state_' + CONFIG.client_id, state, 600, CONFIG.redirect_uri);
    sessionStorage.setItem('state_' + CONFIG.client_id, state);


    window.location.href = CONFIG.authorizationUrl +
      '?response_type=' + encodeURIComponent(CONFIG.response_type) +
      '&redirect_uri=' + encodeURIComponent(redirectURI ? redirectURI : CONFIG.redirect_uri) +
      '&client_id=' + encodeURIComponent(CONFIG.client_id) +
      '&scope=' + encodeURIComponent(CONFIG.scope) +
      '&state=' + encodeURIComponent(state)
    ;
  }

  setSession(token: string, state?: string) {

    if ( state ) {


      // const state1 = getCookie('state_' + CONFIG.client_id);
      const state1 = sessionStorage.getItem('state_' + CONFIG.client_id);


      if (state1) {


        // deleteCookie('state_' + CONFIG.client_id, CONFIG.redirect_uri);
        sessionStorage.removeItem('state_' + CONFIG.client_id);
   

      } else {
        return false;
      }
      if (state !== state1) {
        return false;
      }
    }

    const decodedToken: any = jwtDecode(token);
    if (!decodedToken) {
      return false;
    }

    this.token = token;

    // this.iss = decodedToken.iss;
    // this.iat = +decodedToken.iat;
    this.exp = +decodedToken.exp;
    this.userId = decodedToken.client_id;
    this.scope = decodedToken.scope;
    // this.customerId = +decodedToken.customerId;

    // this.roles = this.scope.split(' ');
    // this.loggedInAsAdmin = ( this.roles.indexOf('admin') !== -1 );

    if (state) {


      // setCookie('access_token_' + CONFIG.client_id, this.token, 3600, CONFIG.redirect_uri);
      sessionStorage.setItem('access_token_' + CONFIG.client_id, this.token);


    }

    this.setLoggedIn(true);

    return true;

  }

  deleteSession() {

    this.token = undefined;

    // this.iss = undefined;
    // this.iat = undefined;
    this.exp = undefined;
    this.userId = undefined;
    this.scope = undefined;
    // this.customerId = undefined;

    // this.roles = undefined;
    // this.loggedInAsAdmin = undefined;


    // deleteCookie('access_token_' + CONFIG.client_id, CONFIG.redirect_uri);
    sessionStorage.removeItem('access_token_' + CONFIG.client_id);
  
    // sessionStorage.removeItem('mqttusr_' + CONFIG.client_id);
    // localStorage.removeItem('mqttpwd_' + CONFIG.client_id);
    // sessionStorage.removeItem('mqtttop_' + CONFIG.client_id);


    this.setLoggedIn(false);

  }

  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }


  getExp() {
    const d = new Date(1000 * (this.exp || 0));
    return (new Date(d.getTime() - d.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ');
  }
}
