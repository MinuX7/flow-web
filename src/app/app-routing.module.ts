import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WizardBar } from './wizard-bar/wizard-bar.component';
import { Step2Component } from './step2/step2.component';
import { AppComponent } from './app.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { FlowComponent } from './flow/flow.component';

const routes: Routes = [
  { path: 'flow', component: FlowComponent },
  { path: 'flow/:company', component: FlowComponent }
  // { path: '', redirectTo: '/flow', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
