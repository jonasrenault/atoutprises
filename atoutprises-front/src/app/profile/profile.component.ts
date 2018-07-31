import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, TopStats} from '../models/user';
import { Top} from '../models/route';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { grades, colorMap, colorList } from '../utils/defaults';
declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  stats$: Observable<any>;
  tops$: Observable<Top[]>;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      this.userService.getUserStats(this.user.id).subscribe(stats => {
        const statsArray = [];
        for (const key of Object.keys(stats.stats)) {
          const stat = stats.stats[key];
          statsArray.push({
            grade: key,
            count: stat.count,
            total: stat.total,
            percent: Math.floor(100 * stat.count / stat.total)
          });
        }
        statsArray.sort((a, b) => grades.indexOf(a.grade) > grades.indexOf(b.grade) ? -1 : 1);
        this.stats$ = of(statsArray);
        setTimeout(() => $('[data-toggle="tooltip"]').tooltip(), 1000);
        this.tops$ = of((<any>stats.tops) as Top[]);
      });
    });
  }

  ngAfterViewInit() {

  }

  getColorLabel(color: string) {
    return colorMap[color].label;
  }

  getColorHex(color: string) {
    return colorMap[color].hex;
  }

}
