import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchPatientService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = 'http://localhost:3000/patients/';

  getPatientDetails(pId: any) {
    const token = localStorage.getItem('token');
    //console.log(token);
    const headers = new HttpHeaders().set('x-access-token', token + '');
    //console.log(headers);
    return this.httpClient.get(
      this.baseUrl + 'getPatientsBypatientId/?patientId=' + pId,
      { headers: headers }
    );
  }
}
