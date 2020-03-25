import { Component, Input, forwardRef, OnDestroy,  ElementRef, ViewChild, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControlDirective, FormControl } from '@angular/forms';
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

export class InputTextComponent implements ControlValueAccessor, OnInit, OnDestroy {

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

    constructor(private controlContainer: ControlContainer,
                private formService: FormService) { }

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

    setDisabledState(isDisabled: boolean): void {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }

    writeValue(value: any) {
      this.formControlDirective.valueAccessor.writeValue(value);
    }

    registerOnChange(fn: any): void {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
}
