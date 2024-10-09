import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) {
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

  ngOnInit(): void {
    // console.log('LoginnComponent innitialized');
    // this.logMessages.push('Log pertama');
    // this.logMessages.push('Log kedua');
  }

}
