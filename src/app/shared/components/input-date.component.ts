import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [MakeProvider(InputDateComponent)]
})

export class InputDateComponent
       extends AbstractValueAccessor<Date>
        implements OnInit {

    @Input() label: string;
    @Input() placeholder = 'mm/dd/yyyy';
    @Input() help: string;
    @Input() validationMessages: object = {};
    @Input() mask = '00/00/0000';

    control: AbstractControl;

    constructor (controlContainer: ControlContainer) {
        super(controlContainer);
    }

    ngOnInit() {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
            } else {
                console.warn('Missing FormControlName');
            }
        } else {
            console.warn('Missing FormControlName');
        }
    }
}
