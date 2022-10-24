import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../user';
import { USERS } from '../mock/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable <User[]> {
    const users = of(USERS);
    return users;
  }
  constructor() { }
}
