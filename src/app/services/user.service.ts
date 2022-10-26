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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }


  getUsers(): Observable <User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    
    console.error(error);

    
    this.log(`${operation} failed: ${error.message}`);

    
    return of(result as T);
  };
}
}
