import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Route } from '../../models/route';
import { Observable } from 'rxjs';
import { colorMap, grades } from '../../utils/defaults';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routes$: Observable<Route[]>;
  @Output() change = new EventEmitter<Route>();
  selectedRoute: Route;

  constructor() { }

  ngOnInit() {
  }

  getColorLabel(color: string) {
    return colorMap[color].label;
  }

  getColorHex(color: string) {
    return colorMap[color].hex;
  }

  routeSearchFn(term: string, item: Route) {
    term = term.toLocaleLowerCase();
    const colorLabel = colorMap[item.color].label;
    return item.lane.toLocaleLowerCase().indexOf(term) > -1
      || item.grade.toLocaleLowerCase().indexOf(term) > -1
      || colorLabel.toLocaleLowerCase().indexOf(term) > -1;
  }

  onChange(item: Route) {
    this.change.emit(item);
  }

}
