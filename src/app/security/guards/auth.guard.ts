import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private authorizationService: AuthorizationService ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (!route.data.roles || route.data.roles.length === 0) {
        return true;
      }

      const currentUser = this.authenticationService.currentUserValue;
      if (!currentUser) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }

      if ( this.authorizationService.IsAuthorized(currentUser, route.data.roles) ) {
          return true;
      }

      this.router.navigate(['notauth']);
      return false;
    }
}
