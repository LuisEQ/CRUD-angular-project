import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
    
    @Input() user?: User;
    users : User[] = [];
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private location: Location
    ) { }
    

    ngOnInit(): void {
    }
    goBack(): void {
      this.location.back();
    }
    add(name: string, password: string, email: string, pin: string): void {
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
  }


