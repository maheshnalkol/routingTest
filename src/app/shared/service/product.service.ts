import { Injectable } from '@angular/core';
import { Iproduct } from '../model/products';
import { Observable, of } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productArr: Array<Iproduct> = [
    {
      pName: 'samsung M31',
      prodId: '123',
      pStatus: 'inprogress',
      canReturn: 1,
    },
    {
      pName: 'Iphone',
      prodId: '124',
      pStatus: 'delivered',
      canReturn: 0,
    },
    {
      pName: 'one plus',
      prodId: '125',
      pStatus: 'dispatch',
      canReturn: 1,
    },
    {
      pName: 'vivo',
      prodId: '126',
      pStatus: 'inprogress',
      canReturn: 0,
    },
  ];
  constructor(private _router: Router, private _snackbar: SnackbarService) {}

  fetchAllArr(): Observable<Iproduct[]> {
    return of(this.productArr);
  }
  getObj(prodId: string): Observable<Iproduct> {
    return of(this.productArr.find((f) => f.prodId === prodId)!);
  }

  addprod(obj: Iproduct) {
    this.productArr.push(obj);
    this._snackbar.openSnackbar(`${obj.pName} is added successfully...!!!`);
    // this._router.navigate(['products']);
  }
  updateprod(obj: Iproduct) {
    let findIndex = this.productArr.findIndex((f) => f.prodId == obj.prodId);
    this.productArr[findIndex] = obj;
    this._snackbar.openSnackbar(
      `${this.productArr[findIndex].pName} is updated to ${obj.pName} successfully...!!!`
    );
    this._router.navigate(['products']);
  }

  removeProd(obj: Iproduct) {
    let findIndex = this.productArr.findIndex((f) => f.prodId == obj.prodId);
    this.productArr.splice(findIndex, 1);
    this._snackbar.openSnackbar(`${obj.pName} is removed successfully...!!!`);

    this._router.navigate(['products']);
  }
}
