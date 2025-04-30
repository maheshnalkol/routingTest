import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { UsersComponent } from './shared/component/users/users.component';
import { UserformComponent } from './shared/component/userform/userform.component';
import { SingleuserComponent } from './shared/component/singleuser/singleuser.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { ProdformComponent } from './shared/component/prodform/prodform.component';
import { SingleprodComponent } from './shared/component/singleprod/singleprod.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'adduser',
        component: UserformComponent,
      },
      {
        path: ':userId',
        component: SingleuserComponent,
      },
      {
        path: ':userId/edit',
        component: UserformComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'addproduct',
        component: ProdformComponent,
      },
      {
        path: ':prodId',
        component: SingleprodComponent,
      },
      {
        path: ':prodId/edit',
        component: ProdformComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
