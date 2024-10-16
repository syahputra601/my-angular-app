import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import Ng Bootstrap
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';
import { Router, NavigationEnd } from '@angular/router';
// import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component'; // Import komponen modal
import { UserRole } from './enums/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showHeader: boolean = true;
  // users: any[] = [];
  users: { user_name: string, email: string, role: number }[] = [];
  // users = [
  //   {"user_name":"Syahputra","email":"syahputra@ymail.com"},
  //   {"user_name":"Firman","email":"firman@ymail.com"}
  // ];
  showHeader_git: boolean = true;
  //testing development

  searchControl = new FormControl(); //Control untuk input autocompolete
  filteredOptions: Observable<any[]>; // Observable untuk opsi yang terfilter

  userRoles = UserRole; //enum untuk role
  userRoleKeys: string[];

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private searchService: SearchService,
    private modalService: NgbModal, //Inject NgbModal
  ) {
    // Memantau rute saat ini
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cek apakah rute saat ini adalah 'login'
        // this.showHeader = event.url !== '/login';
        // this.showHeader = event.url !== '/about';
        this.showHeader = !this.isHiddenHeaderRoute(event.url);
      });
  }

  ngOnInit(){
    this.userService.getUsers().subscribe(data => {
        this.users = data;
    });

    //Mendeteksi perubahan rute
    //version 1
    //pada version ini terjadi bug karena terjadi refresh terus menerus
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd){
    //     // Reload data atau lakukan tindakan yang diinginkan saat rute berubah
    //     window.location.reload(); 
    //   }
    // });
    //version 2
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      //Memanggil metode untuk memuat ulang data, bukan reload halaman
      this.loadData();
    });

    this.filteredOptions = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      // map(value => this._filter(value))
      switchMap(value => this.filterUsers(value)) // Memanggil fungsi filterUsers dengan value input
    );


    // Mengambil keys dari enum untuk dropdown
    this.userRoleKeys = Object.keys(this.userRoles).filter(key => isNaN(Number(key)));

  }

  private _filter(value: string): Observable<any[]> {
    const filterValue = value.toLowerCase();
    return this.searchService.search(filterValue);
  }

  filterUsers(value: string): Observable<any[]> {
    // console.log('Error 1',value);
    // Panggil searchService untuk mendapatkan data yang difilter
    return this.searchService.search(value);
  }

  displayFn(user: any): string {
    return user && user.user_name ? user.user_name : '';
  }

  loadData(): void {
    //Logika untuk memuat ulang data tanpa reload halaman
    this.http.get<any[]>(('http://localhost/api/getusers.php')).subscribe(data => {
      this.users = data;
      // console.log('Rute berubah, data dimuat ulang.');
    })
    //Tambahkan logika lain untuk memuat ulang data atau mengambbil data dari API, dsb.
  }

  // Fungsi untuk menentukan apakah header harus disembunyikan
  private isHiddenHeaderRoute(url: string): boolean {
    const hiddenRoutes = ['/login', '/about', '/user', '/success-dialog', '/edit-user', '/user-list','/search', '/barang', '/masuk']; // Tambahkan rute yang ingin disembunyikan
    return hiddenRoutes.includes(url);
  }

  refreshPage() {
    window.location.reload();
  }
  // constructor(private router: Router) {}

  navigateToLogin(){
    this.router.navigate(['./login']);
  }

  navigateToAbout(){
    this.router.navigate(['./about']);
  }

  navigateToUser(){
    this.router.navigate(['./user']);
  }

  navigateToEditUser(){
    this.router.navigate(['./edit-user']);
  }

  navigateToUserList(){
    this.router.navigate(['./user-list']);
  }

  navigateToSearchAuto(){
    this.router.navigate(['./search']);
  }

  navigateToBarang(){
    this.router.navigate(['./barang']);
  }

  // refreshPage() {
  //   // Menavigasi ke halaman yang sama
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['home']); // Gantilah 'current-route' dengan rute saat ini
  //   });
  // }

  //start bagian modal
  
  //FUNGSI UNTUK MEMBUKA MODAL TAMBAH USER
  getRoleDescription(role: number): string {
    switch (role) {
      case UserRole.Admin:
        return 'Admin';
      case UserRole.Moderator:
        return 'Moderator';
      case UserRole.User:
        return 'User';
      default:
        return 'Unknown Role';
    }
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(UserModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.user = null; // Null untuk mode tambah

    modalRef.result.then((result) => {
      if (result === 'added') {
        this.loadData(); // Reload data setelah tambah
      }
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
  }

  openEditUserModal(user: any) {
    const modalRef = this.modalService.open(UserModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.user = user; // pass user data untuk mode edit

    modalRef.result.then((result) => {
      if (result == 'updated') {
        this.loadData(); //Reload data setelah update
      }
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
  }

  deleteUserModal(user_id: number): void {
    if(confirm("Apakah anda yakin untuk menghapus user ini?")) {
      this.userService.deleteUserModal(user_id).subscribe(response => {
        console.log(response.message);
        //Reload data setelah hapus
        // this.loadData();
        window.location.reload();
      }, error => {
        console.error('Terjadi kesalahan saat menghapus user:', error);
      });
    }
  }

  //end bagian modal

  title = 'project-pertama';

  
}
