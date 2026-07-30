import { Routes } from '@angular/router';
import { SaleComponent } from './components/sale/sale.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  // Redirige el host a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login sin sidebar
  { path: 'login', component: LoginComponent },


  //Redirige a create-Account
  { path: 'register', component: CreateAccountComponent },


  // Layout principal con sidebar
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'sale', component: SaleComponent, canActivate: [authGuard] },
      { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
      { path: 'product', component: ProductComponent, canActivate: [authGuard] },
      { path: 'not-authorized', component: NotAuthorizedComponent },
      { path: '', redirectTo: 'sale', pathMatch: 'full' } // primera página después del login
    ]
  },

  // fallback para rutas no encontradas
  { path: '**', redirectTo: 'login' }
];
