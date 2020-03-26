import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';
import { SelectItem } from '../models/select-item';

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
  ]
})

export class InputRadioComponent implements ControlValueAccessor, OnInit, OnDestroy  {

    private subscriptions = new Subscription();
    @Input() formControlName: string;

    @Input() label: string;
    @Input() items: Array<SelectItem>;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() readonly = false;

    fieldvalue: any = null;
    control: AbstractControl;

    constructor(private controlContainer: ControlContainer,
                private formService: FormService) { }

    ngOnInit() {
      if (this.controlContainer && this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
        this.subscriptions.add(this.formService.state$.subscribe(data => {
          this.readonly = data === 'Read';
          if (this.readonly) {
            this.control.disable();
          } else {
            this.control.enable();
          }
        }));
      } else {
        console.warn('Missing FormControlName');
      }
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    onChange = (_) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    writeValue(value: any) {
      this.fieldvalue = value;
      this.onChange(value);
    }
}
