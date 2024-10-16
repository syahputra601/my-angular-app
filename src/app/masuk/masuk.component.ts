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

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUsersV2().subscribe(data => {
      this.users = data;
  });
  }

  refreshPage() {
    window.location.reload();
  }

  navigateToMasuk(){
    this.router.navigate(['./masuk']);
  }

}
