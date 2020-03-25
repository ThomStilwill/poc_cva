import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormService } from '../services/form-service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-status',
  template: `<span class="control-status" *ngIf="debug">[{{status()}}]</span>`
})
export class ControlStatusComponent {

  @Input() control: FormControl;
  debug: boolean;

  constructor(private formService: FormService) {}

  ngOnInit() {

   }

  status() {
    const control: FormControl = this.control;
    let status = '';

    status += control.touched ? 'T' : 't';
    status += control.dirty ? 'D' : 'd';
    status += control.valid ? 'V' : 'v';
    return status;
  }
}
