import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost/api/search.php';
  // 'http://localhost/api/delete_user.php';

  constructor(private http: HttpClient) { }

  search(term: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?term=${term}`)
  }

  searchModal(term: string): Observable<any[]> {
    if(!term.trim()) {
      //jika tidak ada term, kembalikan array kosong
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    return this.http.get<any[]>(`${this.baseUrl}?term=${term}`);
  }

}
