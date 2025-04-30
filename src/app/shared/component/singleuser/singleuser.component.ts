import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../model/users';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RemoveComponent } from '../remove/remove.component';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.scss'],
})
export class SingleuserComponent implements OnInit, OnDestroy {
  userId!: string;
  userObj!: Iuser;
  subs!: Subscription;

  constructor(
    private _routes: ActivatedRoute,
    private _userService: UserService,
    private _matDailogref: MatDialog
  ) {}

  ngOnInit(): void {
    this.getId();
  }
  getId() {
    this._routes.params.subscribe((s) => {
      if (s) {
        console.log(s);

        this.userId = s['userId'];
        if (this.userId) {
          this.subs = this._userService.getObj(this.userId).subscribe((s) => {
            if (s) {
              this.userObj = s;
            }
          });
        }
      }
    });
  }
  onremove(userObj: Iuser) {
    let matref = this._matDailogref.open(RemoveComponent, {
      data: `Are you sure! you want to remove this user?`,
      width: '600px',
    });
    matref.afterClosed().subscribe((s) => {
      if (s) {
        this._userService.removeUser(userObj);
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
