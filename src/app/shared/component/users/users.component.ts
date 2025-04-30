import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../model/users';
import { Subscription } from 'rxjs';

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
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.fetchallData();
  }
  fetchallData() {
    this.subs = this._userService.fetchAllusers().subscribe((s) => {
      if (s) {
        this.userArr = s;
        this.userActive = s[0];
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
