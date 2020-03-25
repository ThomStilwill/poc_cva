import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ValidationMessagesComponent } from './components/validation-messages.component';
import { InputTextComponent } from './components/input-text.component';
import { InputSelectComponent } from './components/input-select.component';
import { InputDateComponent } from './components/input-date.component';

import { ControlStatusComponent } from './components/control-status.component';
import { FormComponent } from './components/form/form.component';
import { FormService } from './services/form-service';
import { FormstateComponent } from './components/formstate/formstate.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
                FormService,
              ],
  declarations: [
                 InputTextComponent,
                 InputSelectComponent,
                 InputDateComponent,
                 ValidationMessagesComponent,
                 ControlStatusComponent,
                 FormComponent,
                 FormstateComponent
                 ],
  exports: [
            InputTextComponent,
            InputSelectComponent,
            InputDateComponent,
            ValidationMessagesComponent,
            FormComponent
          ]
})
export class SharedModule {

  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('Shared Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ FormService ]
    };
  }
 }
