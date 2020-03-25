import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControlName } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';
import { SelectItem } from '../models/select-item';


@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: [MakeProvider(InputSelectComponent)]
})

export class InputSelectComponent
       extends AbstractValueAccessor<string>
        implements OnInit {

    @Input() label: string;
    @Input() items: Array<SelectItem>;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() validationMessages: object = {};

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
