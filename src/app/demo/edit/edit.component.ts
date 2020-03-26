import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/shared/models/select-item';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  makes: SelectItem[] = [
    {value: 'ford', viewValue: 'Ford'},
    {value: 'chevy', viewValue: 'Chevrolet'},
    {value: 'dodge', viewValue: 'Dodge'},
    {value: 'toyota', viewValue: 'Toyota'},
  ];
  types: SelectItem[] = [
    {value: 'mc', viewValue: 'Motorcycle'},
    {value: 'auto', viewValue: 'Automobile'},
    {value: 'lory', viewValue: 'Truck'},
  ];

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(18)
                ]],
      description: ['', Validators.required],
      make: [null],
      type: [null]
    });

    this.initModel();
   }

  ngOnInit(): void { }

   initModel() {
    this.form.setValue(
      {
        name: 'Carroll Shelby',
        description: 'Designer of the AC Cobra.',
        make: null,
        type: null
      }
    );
  }

  onReset(data) {
    this.form.reset();
    this.initModel();
    this.form.markAsPristine();
    this.form.markAsUntouched();

    console.log('reset: ' + JSON.stringify(this.form.value));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
  }


}
