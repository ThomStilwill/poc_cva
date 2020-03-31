import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

  constructor() {}

  IsAuthorized(user: User, roles: Role[]) {
    return user.roles.filter(x => roles.includes(x)).length > 0;
  }

}
