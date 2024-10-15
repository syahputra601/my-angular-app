// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   private apiUrl = 'http://localhost:3000/auth';
  private apiUrl = 'http://localhost:4200/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // username = 'aji';
    // password = '12345';
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }
}
