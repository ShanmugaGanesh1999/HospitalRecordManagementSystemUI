import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MgtService {
  constructor(private httpClient: HttpClient) {}

  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('x-access-token', this.token + '');

  mgtURL = 'http://localhost:3000/management/';
  drURL = 'http://localhost:3000/doctor/';
  comURL = 'http://localhost:3000/common/';
  appURL = 'http://localhost:3000/appointment/';

  getGraphData(params: any) {
    return this.httpClient.get(
      this.appURL + 'getAppointmentsBySpecialization?data=' + params.data,
      {
        headers: this.headers,
      }
    );
  }

  getAppointments(params: any) {
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
        headers: this.headers,
      }
    );
  }

  changeDoctorStatus(params: any) {
    return this.httpClient.put(
      this.drURL + 'updateDoctorStatusById',
      {
        id: params.id,
        status: params.status,
      },
      {
        headers: this.headers,
      }
    );
  }

  getAllDoctors(params: any) {
    return this.httpClient.get(
      this.drURL +
        'getAllDoctors?search=' +
        params.search +
        '&skip=' +
        params.skip +
        '&limit=' +
        params.limit,
      {
        headers: this.headers,
      }
    );
  }

  getAllCounts(params: any) {
    return this.httpClient.get(
      this.mgtURL +
        'getAllCounts?skip=' +
        params.skip +
        '&limit=' +
        params.limit,
      { headers: this.headers }
    );
  }

  createDoctor(params: any) {
    return this.httpClient.post(
      this.comURL + 'createDoctorAndPwdMail',
      {
        doctorName: params.fullName,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        specialization: params.specialization,
        DOP: params.dop,
      },
      { headers: this.headers }
    );
  }

  sendReport(params: any) {
    return this.httpClient.post(
      this.comURL + 'sendReport',
      {
        from: params.from,
        to: params.to,
        heading: params.heading,
        description: params.description,
      },
      { headers: this.headers }
    );
  }
}
