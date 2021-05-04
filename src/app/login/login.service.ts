import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('x-access-token', this.token + '');
  baseUrl = 'http://localhost:3000/common/';

  loginApi(emailId: any, password: any) {
    return this.httpClient.post(this.baseUrl + 'commonLogin', {
      emailId: emailId,
      password: password,
    });
  }

  logout(params: any) {
    return this.httpClient.post(
      this.baseUrl + 'logout',
      { params },
      { headers: this.headers }
    );
  }

  forgotPwd(email: any) {
    return this.httpClient.post(this.baseUrl + `emailOtp?emailId=${email}`, {});
  }

  otpVerify(otp: any) {
    return this.httpClient.post(this.baseUrl + `verifyOtp?otp=${otp}`, {});
  }

  resetPwd(email: any, pwd: any) {
    return this.httpClient.post(
      this.baseUrl + `resetPwd?emailId=${email}&pwd=${pwd}`,
      {}
    );
  }
}
