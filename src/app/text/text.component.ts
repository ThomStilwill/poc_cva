import { Component, Input, OnInit, AfterViewInit, OnDestroy, forwardRef,
  ViewChild, ElementRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl} from '@angular/forms';

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
  @Input() value: any;

  @ViewChild('textinput', { static: false}) elementRef: ElementRef;

  fieldvalue: any = null;
  control: AbstractControl;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    } else {
      console.warn('Missing FormControlName');
    }
  }

  ngAfterViewInit() {  }
  setDisabledState?(isDisabled: boolean): void {  }
  ngOnDestroy(): void {  }

  writeValue(value: any) {

    this.fieldvalue = value;
    if (this.elementRef) {
        this.elementRef.nativeElement.value = value;
    }
    this.onChange(value);
    console.log('text write: ' + this.fieldvalue);
  }

  onChange = (val: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
