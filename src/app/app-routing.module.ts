import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';

const routes: Routes = [
  { path: 'doctor-page', component: DoctorComponent },
  { path: 'receptionist-page', component: ReceptionistComponent },
  { path: 'management-page', component: ManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
