import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlUtama = 'http://localhost/api/';
  private apiUrl = 'http://localhost/api/getusers.php';
  private apiUrlEdit = 'http://localhost/api/getusersbyid.php';//nnot used
  private apiUrlEditV2 = 'http://localhost/api/getusersbyid.php?user_id=${user_id}';
  private apiUrlGetUserById = 'http://localhost/api/get_user_by_id.php';
  private apiUrlGetUserByIdJoin = 'http://localhost/api/get_user_by_id.php?user_id=${user_id}';
  // private apiUrlGetUserByIdJoin = 'http://localhost/api/get_user_by_id.php/${user_id}';
  private apiUrlUpdateUser = 'http://localhost/api/update_user_v2.php';
  private apiUrlDeleteUser = 'http://localhost/api/delete_user.php';

  constructor(
    private http: HttpClient,
  ) { }

    //Query untuk mengambil daftar user
    // getUsersConn(): Observable<User[]> {
    //   return this.apollo.watchQuery<any>({
    //     query: gql`
    //       query {
    //         users {
    //           id
    //           name
    //           email
    //         }
    //       }
    //     `
    //   })
    //   .valueChanges
    //   .pipe(
    //     map(result => result.data && result.data.users)
    //   );
    // }

    getUsers(): Observable<any> {
      return this.http.get(this.apiUrl);
    }

    getUsersById(): Observable<any> {
      return this.http.get(this.apiUrlEdit);
    }

    getUserByIdV2(user_id: number): Observable<any> {
      return this.http.get('${this.apiUrlEditV2}');
    }

    //Mendapatkan pengguna berdasarkan ID
    getUserByIdV3(user_id: number): Observable<any> {
      return this.http.get(`${this.apiUrlUtama}get_user_by_id.php?user_id=${user_id}`);
      // return this.http.get(`${this.apiUrlGetUserByIdJoin}`);
    }

    //Mengupdate pengguna
    updateUser(user: any): Observable<any> {
      // console.log(user);
      // return this.http.post(`${this.apiUrlUtama}update_user_v2.php`, user);
      return this.http.post<any>(this.apiUrlUpdateUser, user);
    }

    deleteUser(user_id: number): Observable<any> {//version 1
      return this.http.post(`${this.apiUrlDeleteUser}`, user_id);
    }

    //version 1
    deleteUserById(user_id: number): Observable<any> {
      console.log(user_id);
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // };

      //Mengirim request DELETE dengan user_id
      // return this.http.delete(this.apiUrlDeleteUser + '?user_id=${user_id}', httpOptions);
      // return this.http.delete(`http://localhost/api/delete_user.php?user_id=${user_id}`);
      return this.http.get(`${this.apiUrlUtama}delete_user.php?user_id=${user_id}`);
    }

    //version 2
    deleteUserByIdV2(user_id: number): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      // Kirim request DELETE dengan JSON yang berisi user_id
      return this.http.request('delete', `http://localhost/api/delete_user.php?user_id=${user_id}`, {
        body: { user_id: user_id },
        headers: httpOptions.headers
      });
    }

    deleteUserByIdV3(user_id: number): Observable<any> {
      return this.http.delete(`http://localhost/api/delete_user.php?user_id=${user_id}`);
    }


    //START BAGIAN KEPERLUAN UNTUK TESTING MODAL
    //Mendapatkan semua user
    getUsersModal(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrlUtama}/get_user_modal.php`);
    }

    //Mendapatkan user berdasarkan ID
    getUserByIdModal(user_id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrlUtama}/get_user.php?user_id=${user_id}`)
    }

    //Menambah user
    addUserModal(user: any): Observable<any> {
      user.user_code = uuidv4();  // Mengenerate UUID untuk ID pengguna
      console.log('data test2', user);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${this.apiUrlUtama}/add_user_modal.php`, JSON.stringify(user), { headers });
    }

    //MEMPERBARUI USER
    updateUserModal(user: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${this.apiUrlUtama}/update_user_modal.php`, JSON.stringify(user), {headers});
    }

    //menghapus user
    deleteUserModal(user_id: number): Observable<any> {
      // console.log('data simpan', user_id);
      return this.http.delete<any>(`${this.apiUrlUtama}delete_user_modal.php?user_id=${user_id}`);
      // return this.http.delete(`http://localhost/api/delete_user.php?user_id=${user_id}`);
    }


    //END BAGIAN KEPERLUAN UNTUK TESTINGG MODAL

}
