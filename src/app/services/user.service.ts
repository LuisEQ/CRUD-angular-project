import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../user';
import { USERS } from '../mock/mock-users';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private usersUrl = 'api/users'; 
  //private usersUrl = 'http://localhost:4200/users';
  private usersUrl = 'http://localhost';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
    
  getUsers(){
    return this.http.get<User[]>(`${this.usersUrl}/getall.php`);
  }
  getUser(id: number){
    const url = `${this.usersUrl}/get.php?idUser=${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`))
    );
  }
  updateUser(user: User){
    return this.http.put(`${this.usersUrl}/update.php`, user).pipe(
      tap(_ => this.log(`updated id=${user.id}`))
    );
  }

  addUser(user: User){
    return this.http.post<User>(`${this.usersUrl}/post.php`, user).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`))
    );
  }
  deleteUser(id: number){
    const url = `${this.usersUrl}/delete.php?idUser=${id}`;

    return this.http.delete<User>(url).pipe(
      tap(_ => this.log(`deleted user id=${id}`))
    );
  }
}
