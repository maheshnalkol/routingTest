import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../model/users';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userId!: string;
  userArr!: Iuser[];
  subs!: Subscription;
  userActive!: Iuser;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchallData();
  }
  fetchallData() {
    this.subs = this._userService.fetchAllusers().subscribe((s) => {
      if (s) {
        this.userArr = s;
        this.userActive = s[0];
        this._router.navigate([this.userActive.userId], {
          queryParams: { userRole: this.userActive.userRole },
          relativeTo: this._routes,
        });
      }
    });
  }
  onuserselect(user: Iuser) {
    this.userActive = user;
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
