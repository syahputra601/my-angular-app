import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-masuk',
  templateUrl: './masuk.component.html',
  styleUrls: ['./masuk.component.css']
})
export class MasukComponent implements OnInit {
  users: { user_name: string, email: string, role: number }[] = [];
  user: any;
  totalDataUser: number = 0;
  totalData: { jmlh_user: number}[] = [];
  totalDataBarang: { jmlh_barang: number}[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  deleteUserNew(username: number): void {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      this.userService.deleteUserByIdV4(username).subscribe(response => {
        console.log(response.message);
        // Refresh daftar user setelah delete
        // this.getAllUsers();
        // this.router.navigate(['/']);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
      // this.router.navigate(['/user-list']);
    }
    // this.router.navigate(['/user-list']);
  }

  ngOnInit(): void {
    this.userService.getUsersV2().subscribe(data => {
      this.users = data;
    });

    this.userService.getCountUser().subscribe(data => {
      this.totalData = data;
    });

    this.userService.getCountBarang().subscribe(data => {
      this.totalDataBarang = data;
    });

    // Ambil data user dari localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.getCountData();
  }

  refreshPage() {
    window.location.reload();
  }

  navigateToMasuk(){
    this.router.navigate(['./masuk']);
  }

  navigateToUserList(){
    this.router.navigate(['./user-list']);
  }

   // Method untuk memanggil API dan mendapatkan jumlah data
   getCountData(): void {
    console.log('total user', 'gagal');
    // this.userService.getCountUser().subscribe(
    //   (response) => {
    //     console.log('total user', 'gagal');
    //     this.totalDataUser = response.count; // Set jumlah data
    //     this.totalData = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching count:', error);
    //   }
    // );
  }

}
