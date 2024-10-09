import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserRole } from '../enums/role.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  showHeader: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    //Memantau Rute Saat ini
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      // Cek apakah rute saat ini adalah 'login'
      this.showHeader = event.url == '/user-list';
    })
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      // console.log(data);
      this.users = data;
    });
  }

  editUser(user_id: number): void {
    // this.router.navigate(['./edit-user', user_id]);
    // this.router.navigate(['/edit-user', user_id]);
    this.router.navigate(['edit-user', user_id]);
  }

  editUsers(user_id: number): void {
    // console.log(user_id);
    this.router.navigate(['/edit-user', user_id]);
  }

  //version 1
  // deleteUser(user_id: number): void {
  //   // console.log('test');
  //   //Mengirim permintaan delete user dengan user_id
  //   this.userService.deleteUserById(user_id).subscribe(Response => {
  //     console.log(Response.message);
  //     this.router.navigate(['/user-list']);
  //   });
  // }

  //version 2
  deleteUser(user_id: number): void {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      this.userService.deleteUserByIdV2(user_id).subscribe(response => {
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

  getRoleDescription(role: any): string {
    const numericRole = +role;
    console.log('Role Received:', role);
    switch (numericRole) {
      case 1:
        return 'Admin';
      case 2:
        return 'Moderator';
      case 3:
        return 'User';
      default:
        return 'Unknown ROle';
    }
  }

  getRoleDescriptionData(role: UserRole): string {
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

}
