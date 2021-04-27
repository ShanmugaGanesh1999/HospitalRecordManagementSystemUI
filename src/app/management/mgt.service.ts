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

  getAllCounts() {
    return this.httpClient.get(
      this.mgtURL + 'getAllCounts'
      // {headers: this.headers,}
    );
  }
}
