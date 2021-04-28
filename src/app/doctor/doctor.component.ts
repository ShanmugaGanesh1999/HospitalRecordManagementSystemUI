import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ReceptionistService } from '../receptionist/receptionist.service';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  patientIdData: any = [];
  patientIdDataArr: any = [];
  emailId = 'sankavi11@gmail.com';

  constructor(
    private appService: AppService,
    private receptionistService: ReceptionistService,
    private doctorService: DoctorService
  ) {
    appService.logoutButton = true;
    appService.navHead = 'Doctor';
    this.getDoctorIdByEmailId(this.emailId);
  }

  ngOnInit(): void {}

  getDoctorIdByEmailId(emailId: any) {
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        var doctorId = data.doctorId;
        // console.log('doctorId', doctorId);
        this.doctorService.getPatientIdByDoctorId(doctorId).subscribe(
          (data: any) => {
            var patientId = data.patientId;
            // console.log('patientId', patientId);
            // console.log('patientId count', data.patientCount);
            if (data.patientCount > 0) {
              for (let i = 0; i < patientId.length; i++) {
                this.doctorService
                  .getPatientsByPatientId(patientId[i])
                  .subscribe(
                    (data: any) => {
                      // console.log(data.data);
                      this.patientIdDataArr.push(data.data[0]);
                    },
                    (error: any) => {
                      console.log(error.message);
                    }
                  );
              }
              setTimeout(() => {
                // console.log('patientData', this.patientIdDataArr);
                this.patientIdData = this.patientIdDataArr;
              }, 100);
            } else {
              alert('No patients assigned');
            }
          },
          (error: any) => {
            console.log(error.message);
          }
        );
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
}
