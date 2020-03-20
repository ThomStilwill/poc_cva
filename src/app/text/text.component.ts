import { Component, Input, OnInit, AfterViewInit, Injector, OnDestroy, forwardRef, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    }
  ]
})
export class TextComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;

  fieldvalue: any = null;
  control: AbstractControl;

  constructor(private injector: Injector,
              private controlContainer: ControlContainer,
              private _renderer: Renderer2,
              private _elementRef: ElementRef) { }

  ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    } else {
      console.warn('Missing FormControlName');
    }
  }

  ngAfterViewInit() {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  ngOnDestroy(): void {

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

  writeValue(value: any) {
    this.fieldvalue = value;
    this.onChange(value);
    this.control.setValue(value, {emitModelToViewChange: true});
    console.log('text write: ' + this.fieldvalue);
  }

  onChange = (val: any) => { };
  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
