import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MgtService {
  constructor(private httpClient: HttpClient) {}

  mgtURL = 'http://localhost:3000/management/';
  drURL = 'http://localhost:3000/doctor/';
  comURL = 'http://localhost:3000/common/';
  appURL = 'http://localhost:3000/appointment/';

  getGraphData(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.appURL + 'getAppointmentsBySpecialization?data=' + params.data,
      {
        headers: headers,
      }
    );
  }

  getAppointments(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.appURL +
        'getAllAppointmentsToday?status=' +
        params.status +
        '&skip=' +
        params.skip +
        '&limit=' +
        params.limit +
        '&search=' +
        params.search,
      {
        headers: headers,
      }
    );
  }

  changeDoctorStatus(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.put(
      this.drURL + 'updateDoctorStatusById',
      {
        id: params.id,
        status: params.status,
      },
      {
        headers: headers,
      }
    );
  }

  getAllDoctors(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.drURL +
        'getAllDoctors?search=' +
        params.search +
        '&skip=' +
        params.skip +
        '&limit=' +
        params.limit,
      {
        headers: headers,
      }
    );
  }

  getAllCounts(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.mgtURL +
        'getAllCounts?skip=' +
        params.skip +
        '&limit=' +
        params.limit,
      { headers: headers }
    );
  }

  createDoctor(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.comURL + 'createDoctorAndPwdMail',
      {
        doctorName: params.fullName,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        specialization: params.specialization,
        DOP: params.dop,
      },
      { headers: headers }
    );
  }

  sendReport(params: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.comURL + 'sendReport',
      {
        from: params.from,
        to: params.to,
        heading: params.heading,
        description: params.description,
      },
      { headers: headers }
    );
  }
}
