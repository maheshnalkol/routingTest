import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _matSnackbar: MatSnackBar) {}
  openSnackbar(msg: string) {
    this._matSnackbar.open(msg, 'Close', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}
