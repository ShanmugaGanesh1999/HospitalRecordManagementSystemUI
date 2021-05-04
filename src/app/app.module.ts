import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ManagementComponent } from './management/management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertsModule } from 'angular-alert-module';
import { HttpClientModule } from '@angular/common/http';
import { AddPatientComponent } from './receptionist/add-patient/add-patient.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MedicationComponent } from './doctor/medication/medication.component';
import { MatSelectModule } from '@angular/material/select';
import { SearchPatientComponent } from './receptionist/search-patient/search-patient.component';
import { FixAppointmentComponent } from './receptionist/fix-appointment/fix-appointment.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientPreviousRecordComponent } from './patient-previous-record/patient-previous-record.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphAnalysisComponent } from './management/graph-analysis/graph-analysis.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FinishedMedicationComponent } from './doctor/finished-medication/finished-medication.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    ReceptionistComponent,
    ManagementComponent,
    AddPatientComponent,
    MedicationComponent,
    SearchPatientComponent,
    FixAppointmentComponent,
    PatientPreviousRecordComponent,
    GraphAnalysisComponent,
    FinishedMedicationComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    AlertsModule.forRoot(),
    MatProgressBarModule,
    MatTabsModule,
    MatSnackBarModule,
    MatRippleModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
