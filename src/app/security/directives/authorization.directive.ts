import { Directive, OnDestroy, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../_models/role';

@Directive({
  selector: '[auth]'
})
export class AuthorizationDirective implements OnDestroy, OnInit {
  stop$ = new Subject();
  @Input() auth: string;
  isVisible = false;

  constructor(
    private authenticationService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit() {
      this.authenticationService.currentUser.pipe(
        takeUntil(this.stop$)
      )
      .subscribe(user => {
        // If he doesn't have any roles, we clear the viewContainerRef
        if (!user) {
          this.viewContainer.clear();
        }

        const requiredRole = this.auth;
        // If the user has the role needed to
        // render this component we can add it
        const role = (Role)[requiredRole];
        if (!role) {
          throw new Error('Invalid role in auth directive.');
        }

        if (user.roles.includes(role)) {
          // If it is already visible (which can happen if
        // his roles changed) we do not need to add it a second time

          if (!this.isVisible) {
            // We update the `isVisible` property and add the
            // templateRef to the view using the
            // 'createEmbeddedView' method of the viewContainerRef
            this.isVisible = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          // If the user does not have the role,
          // we update the `isVisible` property and clear
          // the contents of the viewContainerRef
          this.isVisible = false;
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
