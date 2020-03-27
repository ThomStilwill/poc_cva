import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/shared/models/select-item';
import { FormBuilder } from '@angular/forms';
import { DemoModel } from '../models/demomodel';

@Component({
  selector: 'app-legacyedit',
  templateUrl: './legacyedit.component.html',
  styleUrls: ['./legacyedit.component.scss']
})
export class LegacyeditComponent implements OnInit {
  model: DemoModel;

  makes: SelectItem[] = [
    {value: 'ford', viewValue: 'Ford'},
    {value: 'chevy', viewValue: 'Chevrolet'},
    {value: 'dodge', viewValue: 'Dodge'},
    {value: 'toyota', viewValue: 'Toyota'},
  ];
  types: SelectItem[] = [
    {value: 'mc', viewValue: 'Motorcycle'},
    {value: 'auto', viewValue: 'Automobile'},
    {value: 'lory', viewValue: 'Truck'},
  ];

  constructor(private fb: FormBuilder) {

    this.initModel();
   }

  ngOnInit(): void { }

  initModel() {
    this.model = new DemoModel('Carroll Shelby', 'Designer of the AC Cobra.', null, null, true);
  }

  reset() {
    this.initModel();
  }

  onReset(data) {
    this.initModel();
    console.log('reset: ' + JSON.stringify(this.model));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.model));
  }

}
