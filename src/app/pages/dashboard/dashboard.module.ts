import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {NewInvoiceComponent} from '../new-invoice/new-invoice.component';
import {RecentInvoiceComponent} from '../recent-invoice/recent-invoice.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PizzaPartyComponent} from '../pizza-party-component/pizza-party-component.component';
import { MomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    DashboardComponent,
    NewInvoiceComponent,
    RecentInvoiceComponent,
    PizzaPartyComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    MomentDateModule,
  ]
})
export class ProfileModule { }
