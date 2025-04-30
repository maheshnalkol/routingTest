import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Iproduct } from '../../model/products';
import { UuidService } from '../../service/uuid.service';

@Component({
  selector: 'app-prodform',
  templateUrl: './prodform.component.html',
  styleUrls: ['./prodform.component.scss'],
})
export class ProdformComponent implements OnInit, OnDestroy {
  prodform!: FormGroup;
  prodId!: string;
  prodObj!: Iproduct;
  isIneditMode: boolean = false;
  isDisable: boolean = false;
  subs!: Subscription;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _uuid: UuidService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getId();
  }
  getId() {
    this.prodId = this._routes.snapshot.params['prodId'];
    if (this.prodId) {
      this.isIneditMode = true;
      this.subs = this._productService.getObj(this.prodId).subscribe((s) => {
        if (s) {
          this.prodObj = s;
          this.prodform.patchValue(this.prodObj);
        }
      });
      this._routes.queryParams.subscribe((s) => {
        console.log(s);
        if (s['canReturn'] == '0') {
          this.prodform.disable();
          this.isDisable = true;
        }
      });
    }
  }

  createForm() {
    this.prodform = new FormGroup({
      pName: new FormControl('', [Validators.required]),
      pStatus: new FormControl('', [Validators.required]),
      canReturn: new FormControl('', [Validators.required]),
    });
  }
  Onsubmit() {
    if (this.prodform.valid) {
      if (this.isIneditMode) {
        let UpdatedObj = this.prodform.value;
        UpdatedObj.prodId = this.prodId;
        this._productService.updateprod(UpdatedObj);
      } else {
        let newPro = this.prodform.value;
        newPro.prodId = this._uuid.generateUuid();
        this._productService.addprod(newPro);
        this.prodform.reset();
      }
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
