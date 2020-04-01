import { Directive, OnDestroy, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/role';

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
    private viewContainer: ViewContainerRef) {  }

  ngOnInit() {
      this.authenticationService.currentUser.pipe(
        takeUntil(this.stop$)
      )
      .subscribe(user => {
        if (!user) {
          this.viewContainer.clear();
        }

        const requiredRole = this.auth;
        const role = (Role)[requiredRole];
        if (!role) {
          throw new Error('Invalid role in auth directive.');
        }

        if (user && user.roles && user.roles.includes(role)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
