import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[] = [];

  
  constructor(private userService:UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
  this.userService.getUsers()
      .subscribe(users => this.users = users);
}
}
