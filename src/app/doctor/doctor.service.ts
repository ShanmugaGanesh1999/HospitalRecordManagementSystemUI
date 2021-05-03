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
  baseMedicationUrl = 'http://localhost:3000/medication/';

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
    // console.log(params);
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.basePatientIdUrl +
        'getAllPendingPatients?doctorId=' +
        params.doctorId +
        '&searchText=' +
        params.searchText,
      { headers: headers }
    );
  }

  getAppointmentIdByPatientId(patientId: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.basePatientIdUrl +
        'getAppointmentIdByPatientId?patientId=' +
        patientId,
      {
        headers: headers,
      }
    );
  }

  createMedication(params: any) {
    // console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseMedicationUrl + 'createMedication',
      {
        appointmentId: params.appointmentId,
        prescription: params.prescription,
        complication: params.complication,
      },
      {
        headers: headers,
      }
    );
  }

  statusAppointmentById(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.put(
      this.basePatientIdUrl + 'statusAppointmentById',
      {
        id: params.appointmentId,
        status: params.status,
      },
      {
        headers: headers,
      }
    );
  }
}
