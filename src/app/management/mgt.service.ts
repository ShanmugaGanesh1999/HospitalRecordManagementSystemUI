import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MgtService {
  constructor(private httpClient: HttpClient) {}

  // token = localStorage.getItem('token');
  // headers = new HttpHeaders().set('x-access-token', this.token + '');

  mgtURL = 'http://localhost:3000/management/';
  drURL = 'http://localhost:3000/doctor/';

  getAllCounts() {
    return this.httpClient.get(
      this.mgtURL + 'getAllCounts'
      // {headers: this.headers,}
    );
  }

  createDoctor(params: any) {
    return this.httpClient.post(
      this.drURL + 'createDoctor',
      {
        doctorName: params.fullName,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        specialization: params.specialization,
        DOP: params.dop,
      }
      // {headers: this.headers,}
    );
  }
}
