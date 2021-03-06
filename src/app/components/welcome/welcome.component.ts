import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../security/services/authentication.service';
import { User } from '../../security/models/user';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['login']);
  }
}
