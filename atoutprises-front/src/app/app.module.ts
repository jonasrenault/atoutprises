import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';

import { AuthInterceptor } from './utils/auth.interceptor';
import { AuthGuard } from './utils/auth.guard';
import { AdminGuard } from './utils/admin.guard';
import { WallResolver } from './utils/wall.resolver';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RouteComponent } from './components/route/route.component';

const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard],
    resolve: { wall: WallResolver }
  },
  {
    path: '',
    redirectTo: '/map',
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
    RouteComponent
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
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WallResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
