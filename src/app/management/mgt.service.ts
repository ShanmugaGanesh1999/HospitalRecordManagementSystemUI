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

  getAllCounts(params: any) {
    return this.httpClient.get(
      this.mgtURL +
        'getAllCounts?skip=' +
        params.skip +
        '&limit=' +
        params.limit +
        '&searchText=' +
        params.searchText,
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
}
