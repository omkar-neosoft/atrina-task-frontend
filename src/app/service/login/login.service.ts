import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://localhost:7001/api/User';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, credentials);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
  }
}
