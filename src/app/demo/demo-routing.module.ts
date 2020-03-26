import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';
import { EditComponent } from './edit/edit.component';
import { LegacyeditComponent } from './legacyedit/legacyedit.component';

const routes: Routes = [
  { path: 'demo',
    component: DemoComponent,
    children: [
      { path: 'edit', component: EditComponent },
      { path: 'legacy', component: LegacyeditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
