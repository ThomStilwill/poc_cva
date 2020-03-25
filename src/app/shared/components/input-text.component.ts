import { Component, OnInit, Input, forwardRef, OnDestroy, AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormService } from '../services/form-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'input-text[formControlName],input-text[formControl],input-text[ngModel]',
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
    @Input() formControlName: string;
    @Input() label: string;
    @Input() type = 'text';
    @Input() placeholder: string;
    @Input() help: string;
    @Input() validationMessages: object = {};
    @Input() readonly = false;

    fieldvalue: any = null;
    control: AbstractControl;

    constructor(private controlContainer: ControlContainer,
                private formService: FormService,
                private renderer: Renderer,
                private elementRef: ElementRef) {
    }

    ngOnInit() {
        if (this.controlContainer && this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
            this.subscriptions.add(this.formService.state$.subscribe(data => {
              this.readonly = data === 'Read';
            }));
        } else {
            console.warn('Missing FormControlName');
        }
    }

    ngAfterViewInit() {
      setTimeout(() => {
        //  this.matInput.ngControl = this.injector.get(NgControl, null);
      });
    }
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    get value(): any {
      console.log('text get: ' + this.fieldvalue);
      return this.fieldvalue;
    }

    set value(value: any) {
      if (value !== this.fieldvalue) {
        this.fieldvalue = value;
        this.onChange(value);
        console.log('text set: ' + this.fieldvalue);
      }
    }

    setDisabledState(isDisabled: boolean): void {
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled',  isDisabled);
    }

    writeValue(value: any) {
      this.fieldvalue = value;
      this.onChange(value);
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', value);
      console.log('text write: ' + this.fieldvalue);
    }

    onChange = (val: any) => {};
    onTouched = () => {};
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
}
