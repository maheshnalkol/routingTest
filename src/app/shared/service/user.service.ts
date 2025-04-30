import { Injectable } from '@angular/core';
import { Iuser } from '../model/users';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersArr: Array<Iuser> = [
    { userName: 'John', userId: '123', userRole: 'Candidate' },
    { userName: 'Emma', userId: '124', userRole: 'Admin' },
    { userName: 'Liam', userId: '125', userRole: 'SuperAdmin' },
    { userName: 'Olivia', userId: '126', userRole: 'Candidate' },
    { userName: 'Noah', userId: '127', userRole: 'Admin' },
    { userName: 'Ava', userId: '128', userRole: 'SuperAdmin' },
    { userName: 'William', userId: '129', userRole: 'Candidate' },
    { userName: 'Sophia', userId: '130', userRole: 'Admin' },
    { userName: 'James', userId: '131', userRole: 'SuperAdmin' },
    { userName: 'Isabella', userId: '132', userRole: 'Candidate' },
  ];

  constructor(private _router: Router, private _snackbar: SnackbarService) {}
  fetchAllusers(): Observable<Iuser[]> {
    return of(this.usersArr);
  }
  getObj(userId: string): Observable<Iuser> {
    return of(this.usersArr.find((f) => f.userId === userId)!);
  }

  addUser(obj: Iuser) {
    this.usersArr.push(obj);
    this._snackbar.openSnackbar(`${obj.userName} is added successfully...!!!`);
    this._router.navigate(['users']);
  }
  updateUser(obj: Iuser) {
    let findIndex = this.usersArr.findIndex((f) => f.userId == obj.userId);
    this.usersArr[findIndex] = obj;
    this._snackbar.openSnackbar(
      `${this.usersArr[findIndex].userName} is updated to ${obj.userName} successfully...!!!`
    );
    this._router.navigate(['users']);
  }

  removeUser(obj: Iuser) {
    let findIndex = this.usersArr.findIndex((f) => f.userId == obj.userId);
    this.usersArr.splice(findIndex, 1);
    this._snackbar.openSnackbar(
      `${obj.userName} is removed successfully...!!!`
    );

    this._router.navigate(['users']);
  }
}
