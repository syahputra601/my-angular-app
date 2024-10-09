import { Component, OnInit } from '@angular/core';
// import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { Router, NavigationEnd } from '@angular/router';
// import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showHeader: boolean = true;
  searchControl = new FormControl(); // Control untuk input autocomplete
  filteredOptions: Observable<any[]>; // Observable untuk opsi yang terfilter

  constructor(private searchService: SearchService,
    private router: Router,
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

   // Fungsi untuk menentukan apakah header harus disembunyikan
   private isHiddenHeaderRoute(url: string): boolean {
    const hiddenRoutes = ['/login', '/about', '/user', '/success-dialog', '/edit-user', '/user-list']; // Tambahkan rute yang ingin disembunyikan
    return hiddenRoutes.includes(url);
  }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        // map(value => this._filter(value))
        switchMap(value => this.filterUsers(value)) // Menggunakan switchMap untuk observables nested
      );
  }

  private _filter(value: string): Observable<any[]> {
    const filterValue = value.toLowerCase();
    return this.searchService.search(filterValue);
  }

  filterUsers(value: string): Observable<any[]> {
    // Panggil searchService untuk mendapatkan data yang difilter
    return this.searchService.search(value);
  }

  displayFn(user: any): string {
    return user && user.user_name ? user.user_name : '';
  }

}
