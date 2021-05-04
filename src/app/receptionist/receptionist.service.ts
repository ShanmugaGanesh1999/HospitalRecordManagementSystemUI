import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReceptionistService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = 'http://localhost:3000/patients/';
  appointmentURL = 'http://localhost:3000/appointment/';

  getAllPatients(params: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.baseUrl +
        'getAllPatientsByName?skip=' +
        params.skip +
        '&limit=' +
        params.limit +
        '&searchText=' +
        params.searchText1,
      { headers: headers }
    );
  }

  deleteAppointment(appointId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.delete(
      this.appointmentURL + 'deleteAppointmentById/?id=' + appointId,
      {
        headers: headers,
      }
    );
  }
}
