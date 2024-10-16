import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showHeader: boolean = true;
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Memantau rute saat ini
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cek apakah rute saat ini adalah 'login'
        this.showHeader = event.url == '/login';
      });
  }

  // public logMessages: string[] = [];

  // constructor() { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        // Simpan token JWT di localStorage
        localStorage.setItem('token', response.token);
        // this.navigateToUserList();
        this.navigateToMasuk();
      },
      error => {
        console.log('Login failed', error);
      }
    );
  }

  navigateToUserList(){
    this.router.navigate(['./user-list']);
  }

  navigateToMasuk(){
    this.router.navigate(['./masuk']);
  }

  ngOnInit(): void {
    // console.log('LoginnComponent innitialized');
    // this.logMessages.push('Log pertama');
    // this.logMessages.push('Log kedua');
  }

}
