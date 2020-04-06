import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { ISecurityService, SERVICE_INTERFACE } from './security-service.interface';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

  constructor(@Inject(SERVICE_INTERFACE) private securityService: ISecurityService) { }

  IsAuthorized(user: User, roles: Role[]) {
    return this.securityService.IsAuthorized(user, roles);
  }
}
