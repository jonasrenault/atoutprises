import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '../../models/route';

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
  colours = [{ label: 'Rouge', key: 'red' }, { label: 'Vert', key: 'green' }, { label: 'Bleu', key: 'blue' },
  { label: 'Jaune', key: 'jaune' }, { label: 'Noir', key: 'black' }, { label: 'Blanc', key: 'white' },
  { label: 'Orange', key: 'orange' }, { label: 'Rose', key: 'pink' }];
  grades = ['3a', '3b', '3c', '4a', '4b', '4c', '5a', '5a+', '5b', '5b+', '5c', '5c+', '6a', '6a+', '6b',
    '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b', '8b+', '8c', '9a'];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.routeForm = this.fb.group({
      setter: [this.route.setter, Validators.required],
      colour: [this.route.colour, Validators.required],
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
    this.route.colour = this.routeForm.value.colour;
    this.route.grade = this.routeForm.value.grade;
    this.route.lane = this.routeForm.value.lane.toString();
    this.create.emit(this.route);
  }

}
