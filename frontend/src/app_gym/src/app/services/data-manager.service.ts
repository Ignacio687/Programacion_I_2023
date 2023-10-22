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
    return {
      email: this.email,
      password: this.password
    }
  }
}
