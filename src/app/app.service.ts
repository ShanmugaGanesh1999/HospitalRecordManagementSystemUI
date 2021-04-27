import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  loading = false;
  navHead = 'Login';
  logoutButton = false;
  constructor() {}
}
