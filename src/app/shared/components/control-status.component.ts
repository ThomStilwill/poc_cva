import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'control-status',
  template: `<span class="control-status" >[{{status()}}]</span>`
})
export class ControlStatusComponent {

  @Input() control: FormControl;
  debug: boolean;

  constructor() {}

  status() {
    const control: FormControl = this.control;
    let status = '';

    status += control.touched ? 'T' : 't';
    status += control.dirty ? 'D' : 'd';
    status += control.valid ? 'V' : 'v';
    return status;
  }
}
