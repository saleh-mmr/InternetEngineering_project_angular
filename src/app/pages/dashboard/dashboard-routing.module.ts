import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NewInvoiceComponent} from '../new-invoice/new-invoice.component';
import {RecentInvoiceComponent} from '../recent-invoice/recent-invoice.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,
    children: [
      {path: 'create-invoice', component: NewInvoiceComponent},
      {path: 'recent-invoice', component: RecentInvoiceComponent},
    ]}
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
