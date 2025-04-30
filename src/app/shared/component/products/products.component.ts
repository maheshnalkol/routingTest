import { Component, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../model/products';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  prodArr: Iproduct[] = [];
  subs!: Subscription;
  isProdActive!: Iproduct;
  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _rotutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
    this.subs = this._productService.fetchAllArr().subscribe((s) => {
      if (s) {
        this.prodArr = s;
        this.isProdActive = s[0];
        this._router.navigate([this.isProdActive.prodId], {
          queryParams: { canReturn: this.isProdActive.canReturn },
          relativeTo: this._rotutes,
        });
      }
    });
  }
  onselect(prod: Iproduct) {
    this.isProdActive = prod;
  }
  // onProdClick(prod: Iproduct) {
  //   this._router.navigate(['products', prod.prodId], {
  //     queryParams: { canReturn: prod.canReturn },
  //   });
  // }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
