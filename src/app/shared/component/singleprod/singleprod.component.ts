import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductService } from '../../service/product.service';
import { Iproduct } from '../../model/products';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RemoveComponent } from '../remove/remove.component';

@Component({
  selector: 'app-singleprod',
  templateUrl: './singleprod.component.html',
  styleUrls: ['./singleprod.component.scss'],
})
export class SingleprodComponent implements OnInit, OnDestroy {
  prodId!: string;
  prodObj!: Iproduct;
  subs!: Subscription;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _matDailogref: MatDialog
  ) {}

  ngOnInit(): void {
    this.getId();
  }
  getId() {
    this._routes.params.subscribe((s) => {
      if (s) {
        this.prodId = s['prodId'];
        if (this.prodId) {
          this.subs = this._productService
            .getObj(this.prodId)
            .subscribe((s) => {
              if (s) {
                console.log(s);
                this.prodObj = s;
              }
            });
        }
      }
    });
  }

  onremove(prodObj: Iproduct) {
    let matref = this._matDailogref.open(RemoveComponent, {
      data: `Are you sure! you want to remove this product?`,
      width: '600px',
    });
    matref.afterClosed().subscribe((s) => {
      if (s) {
        this._productService.removeProd(prodObj);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
