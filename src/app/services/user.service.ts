import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user';
import { USERS } from '../mock/mock-users';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
  getUsers(): Observable <User[]> {
    this.messageService.add('UserService: fetched Users');
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  getUser(id: number): Observable<User> {
    const user = USERS.find(u => u.id === id)!;
    this.messageService.add(`UserService: fetched user id=${id}`);
    return of(user);
  }
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    
    console.error(error);

    
    this.log(`${operation} failed: ${error.message}`);

    
    return of(result as T);
  };
}
}
