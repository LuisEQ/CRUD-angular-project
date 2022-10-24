import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
