import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddPatientService {
  constructor(private httpClient: HttpClient) {}

  basePatientURL = 'http://localhost:3000/patients/';
  addPatient(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.basePatientURL + 'createPatient',
      {
        name: params.pname,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        gender: params.gender,
        dob: params.dob,
      },
      { headers: headers }
    );
  }

  updatePatient(params: any) {
    //console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.put(
      this.basePatientURL + 'updatePatientById',
      {
        id: params.id,
        name: params.pname,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        gender: params.gender,
        dob: params.dob,
      },
      { headers: headers }
    );
  }
}
