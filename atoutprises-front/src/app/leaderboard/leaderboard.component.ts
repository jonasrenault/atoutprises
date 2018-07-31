import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users: User[];
  currUserId: string;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.activeRoute.data
      .subscribe((data: { users: User[] }) => {
        this.users = data.users;
      });
    this.currUserId = this.authService.isLoggedIn() ? this.authService.getUserId() : null;
  }

  onUserClick(user: User) {
    this.router.navigate(['/profile', user.id]);
  }

}
