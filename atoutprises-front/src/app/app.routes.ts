import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './utils/auth.guard';
import { AdminGuard } from './utils/admin.guard';
import { WallResolver } from './utils/wall.resolver';
import { UsersResolver } from './utils/users.resolver';
import { UserResolver } from './utils/user.resolver';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const appRoutes: Routes = [
  { path: 'leaderboard', component: LeaderboardComponent, resolve: { users: UsersResolver } },
  { path: 'profile/:id', component: ProfileComponent, resolve: { user: UserResolver} },
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
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    WallResolver,
    UsersResolver,
    UserResolver
  ]
})
export class AppRoutingModule { }
