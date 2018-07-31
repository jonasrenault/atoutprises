import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';

import { AuthInterceptor } from './utils/auth.interceptor';
import { AuthGuard } from './utils/auth.guard';
import { AdminGuard } from './utils/admin.guard';
import { WallResolver } from './utils/wall.resolver';
import { UsersResolver } from './utils/users.resolver';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RouteComponent } from './components/route/route.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { UserCardComponent } from './profile/user-card/user-card.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const appRoutes: Routes = [
  { path: 'leaderboard', component: LeaderboardComponent, resolve: { users: UsersResolver } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard],
    resolve: { wall: WallResolver }
  },
  {
    path: '',
    redirectTo: '/leaderboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    AdminDashboardComponent,
    RouteComponent,
    RouteListComponent,
    UserCardComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    AvatarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WallResolver,
    UsersResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
