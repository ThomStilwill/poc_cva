import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(12)
                ]],
      description: ['', Validators.required]
    });

    this.initModel();
   }

   initModel() {
    this.form.setValue(
      {
        name: 'James T Kirk',
        description: 'The real captain.'
      }
    );
  }

  reset() {
    this.initModel();
    console.log('reset: ' + JSON.stringify(this.form.value));
  }

  submit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
  }

}
