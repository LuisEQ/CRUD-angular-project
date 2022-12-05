import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../user';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
    
  getUsers(): Observable <User[]>{
    return this.http.get<User[]>(`${this.usersUrl}/getall.php`)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/get.php?idUser=${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  updateUser(user: User){
    return this.http.put(`${this.usersUrl}/update.php`, user).pipe(
      tap(_ => this.log(`updated id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(user: User){
    return this.http.post<User>(`${this.usersUrl}/post.php`, user).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  deleteUser(id: number){
    const url = `${this.usersUrl}/delete.php?idUser=${id}`;

    return this.http.delete<User>(url).pipe(
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
