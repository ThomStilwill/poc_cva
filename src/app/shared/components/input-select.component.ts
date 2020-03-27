import { Component, OnInit, Input, forwardRef, OnDestroy, ViewChild, Injector } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { SelectItem } from '../models/select-item';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})

export class InputSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {

    private subscriptions = new Subscription();
    @Input() formControl: FormControl;
    @Input() formControlName: string;

    @Input() label: string;
    @Input() items: Array<SelectItem>;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() validationMessages: object = {};
    @Input() readonly = false;

    @ViewChild(FormControlDirective, {static: true})  formControlDirective: FormControlDirective;
    @Input('value') _value;

    constructor(private injector: Injector,
                private controlContainer: ControlContainer,
                private formService: FormService) { }

    ngOnInit() {

      const ngControl: NgControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.formControl = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }

      this.subscriptions.add(this.formService.state$.subscribe(data => {
        this.readonly = data === 'Read';
        if (this.readonly) {
          this.control.disable();
        } else {
          this.control.enable();
        }
      }));
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


    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    // setDisabledState(isDisabled: boolean): void {
    //   this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    // }

    // writeValue(value: any) {
    //   this.value = value;
    //   this.formControlDirective.valueAccessor.writeValue(value);
    // }

    // registerOnChange(fn: any): void {
    //   this.formControlDirective.valueAccessor.registerOnChange(fn);
    // }

    // registerOnTouched(fn: any): void {
    //   this.formControlDirective.valueAccessor.registerOnTouched(fn);
    // }
}
