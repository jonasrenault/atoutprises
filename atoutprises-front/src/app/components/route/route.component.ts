import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '../../models/route';
import { colorList, grades } from '../../utils/defaults';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteComponent implements OnInit, OnChanges {

  @Input() route: Route;
  @Output() create = new EventEmitter<Route>();
  wasValidated = false;
  routeForm: FormGroup;
  colors = colorList;
  grades = grades;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.routeForm = this.fb.group({
      setter: [this.route.setter, Validators.required],
      color: [this.route.color, Validators.required],
      grade: [this.route.grade, Validators.required],
      lane: [this.route.lane ? this.route.lane : 1, Validators.required]
    });
  }

  onSubmit() {
    if (!this.routeForm.valid) {
      this.wasValidated = true;
      return;
    }
    this.route.setter = this.routeForm.value.setter;
    this.route.color = this.routeForm.value.color;
    this.route.grade = this.routeForm.value.grade;
    this.route.lane = this.routeForm.value.lane.toString();
    this.create.emit(this.route);
  }

}
