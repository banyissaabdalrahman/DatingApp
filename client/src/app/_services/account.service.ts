import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  //create new Observable
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(`${this.baseUrl}account/login`, model).pipe(
      map(
        (response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}account/register`, model).pipe(
      map(
        (user: User) => {
          if (user) {
            this.setCurrentUser(user);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
