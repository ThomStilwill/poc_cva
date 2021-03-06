import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { DemoComponent } from './demo.component';
import { SharedModule } from '../shared/shared.module';
import { DemoRoutingModule } from './demo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegacyeditComponent } from './legacyedit/legacyedit.component';

@NgModule({
  declarations: [
    EditComponent,
    DemoComponent,
    LegacyeditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoRoutingModule,
    SharedModule.forRoot()
  ]
})
export class DemoModule { }
