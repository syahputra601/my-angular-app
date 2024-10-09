import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserEditService } from '../user-edit.service';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UserRole } from '../enums/role.enum';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user_id: number;
  user_name: string = '';
  email: string = '';
  phone: string = '';
  users: any = {};

  showHeader: boolean = true;
  // users: any;
  // users: { user_name: string, email: string, role: number, phone: number }[] = []; //version old
  user: any = { user_id: 0, user_name: '', email: '', phone: '', role: '' };

  //Keperluan untuk selected data
  userRoles = UserRole;//Mengambil enum untuk digunakan di template
  userRoleKeys: string[];//array untuk menyimpan nama role

  //variable untuk menampung role yang dipilih
  // selectedRole: UserRole = UserRole.Admin;
  selectedRole: UserRole; //Role yang dipilih

  constructor(
    private route: ActivatedRoute,
    private userEditService: UserEditService,
    private router: Router,
    private UserService: UserService, //Service untuk mengambil user dari API
  ) {
      // Memantau rute saat ini
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cek apakah rute saat ini adalah 'login'
        this.showHeader = event.url == '/edit-user';
      });
  }

  ngOnInit(): void {
    // console.log('error 22', 'error pertama testing');
    //version 1
    // this.route.params.subscribe(params => {
    //   this.user_id = +params['user_id']; // Mendapatkan id pengguna dari URL
    //   this.getUserDataById(this.user_id);
    //   // console.log('action 1', this.getUserDataById(this.user_id));
    // });
    //version 2
    // const userId = +this.route.snapshot.paramMap.get('user_id');
    // if (userId) {
    //   const userIdTest = Number(userId);
    //   this.getUserDataById(userIdTest);
    // } else {
    //   console.error('User ID not found in route');
    // }
    // this.getUserDataById(userId);
    // console.log('action 1', );
    //version 3
    this.route.paramMap.subscribe(params => {
      //pengecekan untuk cek user id data/tidak saat klik tombol edit
      const userId = params.get('user_id');
      if (userId) {
        this.user_id = +userId; // Mengonversi user_id ke angka
        // this.getUserDataById(this.user_id); // Panggil fungsi untuk mengambil data user berdasarkan ID
      } else {
        console.error('User ID not found in route');
      }
    });

    //pengecekan untuk debugging user.service
    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id');
      console.log('user id from route: ', userId); //debuging
      if (userId){
        this.user_id = +userId;
        console.log('Converted User ID: ', this.user_id); //debugging
        // this.getUserDataById(this.user_id);
      }
    });
    //start version 4
    const user_id = +this.route.snapshot.paramMap.get('user_id');
    // console.log('data test 1', user_id);
    this.UserService.getUserByIdV3(user_id).subscribe((data: any) => {
      // console.log(data);
      this.user = data;
    });
    //end version 4
    
    // Ambil semua keys dari enum UserRole (Admin, Moderator, User)
    this.userRoleKeys = Object.keys(this.userRoles).filter(key => isNaN(Number(key)));

    this.user_id = +this.route.snapshot.paramMap.get('user_id');

    this.UserService.getUserByIdV3(this.user_id).subscribe((userData: any) => {
      // console.log(userData);
      //setelah data diambil, set nilai default untuk dropdown
      this.selectedRole = userData.role; //misalkan 'role' disimpan dalam userData
    })
  }

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
    console.log("Selected Role: ", this.selectedRole); //Output role yang dipilih
  }

  //start version 4
  updateUser(): void {
    // console.log('data user', this.user);
    // console.log('test data', 'no data');
    this.UserService.updateUser(this.user).subscribe((response: any) => {
      console.log(response.message);
      // console.log(this.user);
      this.router.navigate(['/user-list']);
    })
  }

  // getUserDataById(user_id: number): void {
  //   // Gantilah metode ini dengan yang sesuai untuk mendapatkan data pengguna
  //   // Untuk keperluan contoh ini, kita anggap data sudah ada
  //   // Misalnya kita memiliki fungsi di UserService yang mengembalikan data pengguna berdasarkan ID
  //   this.UserService.getUserByIdV3().subscribe(data => {
  //     // console.log(data);
  //     this.user = data;
  //   });
  // }
     
  // updateUser(): void {
  //   const userData = {
  //     user_id: this.user_id,
  //     user_name: this.user_name,
  //     email: this.email,
  //     phone: this.phone
  //   };

  //   this.userEditService.updateUser(userData).subscribe(response => {
  //     console.log(response.message);
  //     this.router.navigate(['/']); // Navigasi ke halaman pengguna setelah update
  //   });
  // }

}
