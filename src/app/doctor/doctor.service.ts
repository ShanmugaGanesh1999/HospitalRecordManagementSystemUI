import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  baseDoctorEmailIdUrl = 'http://localhost:3000/doctor/';
  basePatientIdUrl = 'http://localhost:3000/appointment/';
  basePatientDetailsUrl = 'http://localhost:3000/patients/';

  getDoctorIdByEmailId(emailId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.baseDoctorEmailIdUrl + 'getDoctorIdByEmailId?emailId=' + emailId,
      {
        headers: headers,
      }
    );
  }

  getPatientIdByDoctorId(doctorId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.basePatientIdUrl + 'getPatientIdByDoctorId?doctorId=' + doctorId,
      {
        headers: headers,
      }
    );
  }

  getPatientsByPatientId(patientId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.basePatientDetailsUrl +
        'getPatientsByPatientId?patientId=' +
        patientId,
      {
        headers: headers,
      }
    );
  }

  getAllPatients() {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(this.basePatientDetailsUrl + 'getAllPatients', {
      headers: headers,
    });
  }

  getAllPendingPatients(params: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.basePatientIdUrl +
        'getAllPendingPatients?skip=' +
        params.skip +
        '&limit=' +
        params.limit +
        '&searchText=' +
        params.searchText,
      { headers: headers }
    );
  }
}
