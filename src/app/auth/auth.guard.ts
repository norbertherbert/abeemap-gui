import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    actdRoute: ActivatedRouteSnapshot,
    rtrState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      'access_token' in actdRoute.queryParams &&
      'state' in actdRoute.queryParams // &&
    ) {

      const tokenIsValid: boolean = this.authService.setSession(
        actdRoute.queryParams.access_token,
        actdRoute.queryParams.state
      );

      const parsedUrl = new URL(window.location.href);
      parsedUrl.searchParams.delete('access_token');
      parsedUrl.searchParams.delete('state');

      window.location.href = parsedUrl.href;

      return false;
      
    } else if (this.authService.loggedIn) {

      return true;

    } else {
      this.authService.login(window.location.href);

      return false;

    }
  }

}
