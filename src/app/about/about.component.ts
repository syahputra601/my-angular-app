import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  // styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) {
    // Memantau rute saat ini
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cek apakah rute saat ini adalah 'login'
        this.showHeader = event.url == '/about';
      });
  }

  // constructor() { }

  ngOnInit(): void {
  }

}
