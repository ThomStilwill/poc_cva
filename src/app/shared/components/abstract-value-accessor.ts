import { forwardRef, Input, ElementRef, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export abstract class AbstractValueAccessor <T>
                implements ControlValueAccessor {

    _value: T = null;
    @Input() formControlName: string;
    @ViewChild('input', { static: false}) elementRef: ElementRef;

    constructor(protected controlContainer: ControlContainer) {}

    get value(): T {
      return this._value;
    }

    set value(v: T) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }

    writeValue(value: T) {
      this._value = value;
      this.onChange(value);
      if (this.elementRef) {
        this.elementRef.nativeElement.value = value;
      }
    }

    onChange = (_) => {};
    onTouched = () => {};

    registerOnChange(fn: (_: T) => void): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
}

export function MakeProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
