import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FixAppointmentService {
  constructor(private httpClient: HttpClient) {}

  baseDoctorUrl = 'http://localhost:3000/doctor/';
  baseAppointmentURL = 'http://localhost:3000/appointment/';
  baseManagementURL = 'http://localhost:3000/management/';

  getDoctorsByStatus(status: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.baseDoctorUrl + 'getDoctorsByStatus/?status=' + status,
      { headers: headers }
    );
  }

  fixAppointment(params: any) {
    //console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseAppointmentURL + 'createAppointment',
      {
        patientId: params.patientId,
        doctorId: params.doctorId,
      },
      { headers: headers }
    );
  }

  updateCountByDate(state: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.put(
      this.baseManagementURL + 'updateCountByDate/?state=' + state,
      {
        headers: headers,
      }
    );
  }
}
