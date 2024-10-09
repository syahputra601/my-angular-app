import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { UserRole } from '../enums/role.enum';
import { Key } from 'protractor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showHeader: boolean = true;
  user = {
    user_id: '',
    user_name: '',
    email: '',
    phone: '',
    role: ''
  };

  //variable untuk keperluan selected
  userRoles = UserRole; //Mengambil enum untuk digunakan di template
  userRoleKeys: string[]; //Array untuk menyimpan nama role

  //Variable untuk menampung role yang dipilih
  selectedRole: UserRole = UserRole.User;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {
    // Memantau rute saat ini
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cek apakah rute saat ini adalah 'user'
        this.showHeader = event.url == '/user';
      });
  }

  onSubmit(){
    this.http.post('http://localhost/api/add_user.php', this.user)
    .subscribe(Response => {
      // console.log('User added successfully', Response);
      this.openSuccessDialog();
    }, error => {
      console.error('Error adding user', error);
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      data: {
        title: 'sukses',
        message: 'Data berhasil disimpan!'
      }
    });
  }

  ngOnInit(): void {
    // Ambil semua keys dari enum UserRole (Admin, Moderator, User)
    this.userRoleKeys = Object.keys(this.userRoles).filter(key => isNaN(Number(key)));
  }

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
    console.log("Selected Role:", this.selectedRole); //Outpun role yang dipilih
  }

}
