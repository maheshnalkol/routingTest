import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HomeComponent } from './shared/component/home/home.component';
import { UsersComponent } from './shared/component/users/users.component';
import { SingleuserComponent } from './shared/component/singleuser/singleuser.component';
import { UserformComponent } from './shared/component/userform/userform.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { SingleprodComponent } from './shared/component/singleprod/singleprod.component';
import { ProdformComponent } from './shared/component/prodform/prodform.component';
import { MaterialModule } from './shared/material/material.module';
import { RemoveComponent } from './shared/component/remove/remove.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    SingleuserComponent,
    UserformComponent,
    ProductsComponent,
    SingleprodComponent,
    ProdformComponent,
    RemoveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
