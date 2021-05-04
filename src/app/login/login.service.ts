import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = 'http://localhost:3000/common/';

  loginApi(emailId: any, password: any) {
    return this.httpClient.post(this.baseUrl + 'commonLogin', {
      emailId: emailId,
      password: password,
    });
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
