import { User } from '../models/user';
import { Role } from '../models/role';
import { InjectionToken } from '@angular/core';

export interface ISecurityService {
  IsAuthorized(user: User, roles: Role[]): boolean;
}

export const SERVICE_INTERFACE = new InjectionToken('ISecurityService');
