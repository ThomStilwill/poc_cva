import { Component, Input, forwardRef, OnDestroy, ViewChild, OnInit, AfterViewInit, Injector } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControlDirective, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})

export class InputTextComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

    private subscriptions = new Subscription();
    @Input() formControl: FormControl;
    @Input() formControlName: string;

    @Input() label: string;
    @Input() type = 'text';
    @Input() placeholder: string;
    @Input() help: string;
    @Input() validationMessages: object = {};
    @Input() readonly = false;

    @ViewChild(FormControlDirective, {static: true})  formControlDirective: FormControlDirective;

    @Input('value') _value;

    constructor(private injector: Injector,
                private controlContainer: ControlContainer,
                private formService: FormService) { }

    ngAfterViewInit(): void {

      const ngControl: NgControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.formControl = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }
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

    get control() {
      return this.formControl || this.controlContainer.control.get(this.formControlName);
    }

    ngOnInit() {
      this.subscriptions.add(this.formService.state$.subscribe(data => {
        this.readonly = data === 'Read';
      }));
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

}
