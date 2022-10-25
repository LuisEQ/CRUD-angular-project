import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'Pancho', email: 'asdasd@hotmail.com', password: '123d', pin: '3232' },
      { id: 2, name: 'Miguel', email: 'fsdfgf@hotmail.com', password: 'yg54he', pin: '4434' },
      { id: 3, name: 'Ramon', email: 'ramon@hotmail.com', password: 'r4e5w3', pin: '3422' },
      { id: 4, name: 'Sebastian', email: 'sebas@hotmail.com', password: 'verf', pin: '6546' },
      { id: 5, name: 'Maria', email: 'maria2133@hotmail.com', password: '432fdfs', pin: '5464' },
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 0;
  }
}
