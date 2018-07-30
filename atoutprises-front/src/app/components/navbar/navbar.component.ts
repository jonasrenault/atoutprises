import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  onLogged($event: boolean) {
    $('#loginModal').modal('hide');
  }

}
