
//import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MomentModule} from 'angular2-moment';

//Module custom
import { MessagesModule } from './messages/messages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/user-edit/edit.component';
import { UsersComponent} from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { publicationsComponent } from './components/publications/publications.component';
import { profileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//SERVICES
import { Userguard } from './services/user.guard';
import { userService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    publicationsComponent,
    FollowingComponent,
    FollowedComponent,
    profileComponent
  ],
  imports: [
    MessagesModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    routing,
    
  ],
  providers: [
    appRoutingProviders,
    userService,
    Userguard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
