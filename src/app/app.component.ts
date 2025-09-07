import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SaleComponent } from './components/sale/sale.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { EditSaleComponent } from './components/edit-sale/edit-sale.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SaleComponent, SidebarComponent, RouterOutlet,
  CategoryComponent, ProductComponent,
  EditSaleComponent, NotFoundComponent, BlankLayoutComponent, SidebarLayoutComponent],
  template: `<router-outlet></router-outlet>`
 })
export class AppComponent {}
