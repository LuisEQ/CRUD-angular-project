import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [
  ];

  
  constructor(private userService:UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers()
        .subscribe((users: User[]) => {
          this.users = users;
          console.log(this.users);
        });
  }



  add(name: string, password :string, email : string, pin: string): void {
    name = name.trim();
    password = password.trim();
    email = email.trim();
    pin = pin.trim();
    if (!name || !password || !email || !pin ) { return; }
    this.userService.addUser({ name, password, email, pin } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
