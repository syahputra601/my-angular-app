import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {
  private apiUrl = 'http://localhost/api/edit_user.php';

  constructor(
    private http: HttpClient,
    private UserService: UserService,
  ) { }

    updateUser( userData: { user_id: number; user_name: string; email: string }): Observable<any> {
      return this.http.put(this.apiUrl, userData);
    }
}
