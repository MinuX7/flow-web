import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WizardBar } from './wizard-bar/wizard-bar.component';
import { Step2Component } from './step2/step2.component';
import { AppRoutingModule } from './app-routing.module';
import { Step1Component } from './step1/step1.component';
import { FlowService } from './flow-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Step3Component } from './step3/step3.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Step4Component } from './step4/step4.component';
import { FlowComponent } from './flow/flow.component';
import { Step5Component } from './step5/step5.component';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    WizardBar,
    Step2Component,
    Step1Component,
    Step3Component,
    Step4Component,
    FlowComponent,
    Step5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [FlowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
