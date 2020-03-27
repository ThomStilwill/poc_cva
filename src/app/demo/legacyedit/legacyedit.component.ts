import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'src/app/shared/models/select-item';
import { DemoModel } from '../models/demomodel';
import { FormService } from 'src/app/shared/services/form-service';

@Component({
  selector: 'app-legacyedit',
  templateUrl: './legacyedit.component.html',
  styleUrls: ['./legacyedit.component.scss']
})
export class LegacyeditComponent implements OnInit {
  model: DemoModel;
  @Input() readonly = false;

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

  constructor(private formService: FormService) {

    this.initModel();
   }

  ngOnInit(): void { }

  initModel() {
    this.model = new DemoModel('Carroll Shelby', 'Designer of the AC Cobra.', null, null, true);
  }


  setState() {
    this.readonly = !this.readonly;
    this.formService.setState(this.readonly ? 'Read' : 'Edit');
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
