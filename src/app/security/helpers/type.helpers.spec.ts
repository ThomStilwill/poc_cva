import { TestBed, async } from '@angular/core/testing';
import { StringToEnum } from './type.helpers';
import { Role } from '../models/role';

describe('Type Helpers', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    }).compileComponents();
  }));

  it('StringToEnum should parse Admin', () => {
    const role = StringToEnum(Role, 'Admin');
    expect(role).toEqual(Role.Admin);
  });

  it('StringToEnum should parse User', () => {
    const role = StringToEnum(Role, 'User');
    expect(role).toEqual(Role.User);
  });

  it('StringToEnum should not parse user', () => {
    const txt = 'user';
    const role = StringToEnum(Role, txt);
    expect(role).not.toEqual(Role.User);
  });

});
