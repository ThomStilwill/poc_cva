import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app-config.module';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private storageKey = 'currentUser';
    private encode = true;

    constructor(private http: HttpClient,
                private storage: StorageService,
                @Inject(APP_CONFIG) private config: AppConfig) {


        this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    private getUser(): User {
      const userData = this.storage.getItem(this.storageKey, this.encode);
      return JSON.parse(userData);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const userData = JSON.stringify(user);
                    this.storage.setItem(this.storageKey, userData, this.encode);
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.storage.removeItem(this.storageKey);
        this.currentUserSubject.next(null);
    }
}
