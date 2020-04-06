import { Injectable } from '@angular/core';
import { User } from '../security/models/user';
import { Role } from '../security/models/role';
import { ISecurityService } from '../security/services/security-service.interface';

@Injectable({
  providedIn: 'root'
})

export class SecurityService implements ISecurityService {
  IsAuthorized(user: User, roles: Role[]): boolean {
    return user.roles.filter(x => roles.includes(x)).length > 0;
  }
}
