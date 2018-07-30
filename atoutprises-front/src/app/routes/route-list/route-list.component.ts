import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Route } from '../../models/route';
import { Observable } from 'rxjs';
import { colourMap, grades } from '../../utils/defaults';

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

  getColourLabel(colour: string) {
    return colourMap[colour].label;
  }

  getColourHex(colour: string) {
    return colourMap[colour].hex;
  }

  routeSearchFn(term: string, item: Route) {
    term = term.toLocaleLowerCase();
    const colourLabel = colourMap[item.colour].label;
    return item.lane.toLocaleLowerCase().indexOf(term) > -1
      || item.grade.toLocaleLowerCase().indexOf(term) > -1
      || colourLabel.toLocaleLowerCase().indexOf(term) > -1;
  }

  onChange(item: Route) {
    this.change.emit(item);
  }

}
