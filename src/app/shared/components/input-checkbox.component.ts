import { Component, OnInit, Input, forwardRef, OnDestroy, ViewChild, Injector } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';
import { SelectItem } from '../models/select-item';

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true
    }
  ]
})

export class InputCheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy  {

    private subscriptions = new Subscription();
    @Input() formControl: FormControl;
    @Input() formControlName: string;

    @Input() label: string;
    @Input() items: Array<SelectItem>;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() readonly = false;

    @ViewChild(FormControlDirective, {static: true})  formControlDirective: FormControlDirective;
    @Input('value') _value;

    constructor(private injector: Injector,
                private controlContainer: ControlContainer,
                private formService: FormService) { }

    ngOnInit() {
      this.subscriptions.add(this.formService.state$.subscribe(data => {
        this.readonly = data === 'Read';
        if (this.readonly) {
          this.control.disable();
        } else {
          this.control.enable();
        }
      }));

      const ngControl: NgControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.formControl = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    get control() {
      return this.formControl || this.controlContainer.control.get(this.formControlName);
    }

    get value() {
      return this._value;
    }

    set value(val) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }

    onChange: any = () => {};
    onTouched: any = () => {};
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    writeValue(value) {
      if (value !== undefined) {
        this._value = value;
      }
    }

}
