import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users: User[];
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.data
      .subscribe((data: { users: User[] }) => {
        this.users = data.users;
      });
  }

}
