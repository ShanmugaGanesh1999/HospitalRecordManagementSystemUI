import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientPreviousRecordService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = 'http://localhost:3000/appointment/';

  getDetails(pId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      this.baseUrl + 'getAppointmentDetailsByPatientId/?patientObjectId=' + pId,
      { headers: headers }
    );
  }
}
