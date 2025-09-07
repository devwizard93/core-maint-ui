import { Routes } from '@angular/router';
import { SaleComponent } from './components/sale/sale.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { EditSaleComponent } from './components/edit-sale/edit-sale.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';



export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      { path: '', redirectTo: 'sale', pathMatch: 'full' },
      { path: 'sale', component: SaleComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'edit-sale', component: EditSaleComponent }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '**', component: NotFoundComponent }
    ]
  }
];
