import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UuidService } from '../../service/uuid.service';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from '../../model/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit, OnDestroy {
  userId!: string;
  userform!: FormGroup;
  userObj!: Iuser;
  isIneditMode: boolean = false;
  subs!: Subscription;
  isDisable: boolean = false;
  constructor(
    private _userService: UserService,
    private _uuid: UuidService,
    private _routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getId();
  }

  getId() {
    this.userId = this._routes.snapshot.params['userId'];
    if (this.userId) {
      this.isIneditMode = true;
      this.subs = this._userService.getObj(this.userId).subscribe((s) => {
        if (s) {
          this.userObj = s;
          this.userform.patchValue(this.userObj);
        }
      });
      this._routes.queryParams.subscribe((s) => {
        console.log(s);
        if (s['userRole'] == 'Candidate') {
          this.userform.disable();
          this.isDisable = true;
        }
      });
    }
  }

  createForm() {
    this.userform = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userRole: new FormControl('', [Validators.required]),
    });
  }
  Onsubmit() {
    if (this.userform.valid) {
      if (this.isIneditMode) {
        let UpdatedObj = this.userform.value;
        UpdatedObj.userId = this.userId;
        this._userService.updateUser(UpdatedObj);
      } else {
        let newObj = this.userform.value;
        newObj.userId = this._uuid.generateUuid();
        this._userService.addUser(newObj);
      }
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
