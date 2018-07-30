import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route, Hold } from '../../models/route';
import { Wall } from '../../models/wall';
import { WallService } from '../../services/wall.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  route: Route;
  wall: Wall;
  holds = new Array<Hold>();
  routes: Observable<Route[]>;
  constructor(private wallService: WallService, private toastr: ToastrService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.route = new Route();
    this.activeRoute.data
      .subscribe((data: { wall: Wall }) => {
        this.wall = data.wall;
        this.route.wall = this.wall.id;
      });
    this.routes = this.wallService.getRoutes();
  }

  onRouteCreate(route: Route) {
    this.route.holds = this.holds;
    this.wallService.createRoute(route).subscribe(() => {
      this.toastr.success('Route created sucessfully.');
      this.route = new Route();
      this.route.wall = this.wall.id;
    });
  }

  onChange(route: Route) {
    if (route) {
      this.route = route;
    } else {
      this.route = new Route();
      this.route.wall = this.wall.id;
    }
  }

}
