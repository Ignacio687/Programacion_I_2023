import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  email: string = "";
  password: string = "";

  setUserCredentials(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  getUserCredentials() {
    const email = this.email
    const password = this.password
    this.email = ""
    this.password = ""
    return {
      email: email,
      password: password
    }
  }
}
