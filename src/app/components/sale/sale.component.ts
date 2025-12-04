import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpHeaders } from '@angular/common/http';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale.model';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../services/category.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {

  categories: Category[] = [];
  categoryForm: Category = { id: null, name: '' };
  categoriesSelectName: string = '';
  categoriesSelectId: number | null = null;
  productsFilter: Product[] = [];
  product: Product[] = [];
  productsSelect: Product[] = [];
  lastSale: Sale | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

  loadCategory(): void {
     this.categoryService.getAllCategories()
       .pipe(takeUntil(this.destroy$))
       .subscribe({
         next: (response: ApiResponse<Category[]>) => {
           this.categories = response.data; // array real para Angular
         },
         error: (err) => console.error('Error al cargar categorías:', err)
       });
   }

  loadProduct(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.product = data;
    });
  }

  categorySelect(name: string, id: number): void {
    this.categoriesSelectName = name;
    this.categoriesSelectId = id;
    this.productService.getAllProducts().subscribe((product: Product[]) => {
      this.productsFilter = product.filter(p => p.idCategory === id);
    });
  }

  addProduct(product: Product): void {
    this.productsSelect.push(product);
  }

  removeProduct(index: number): void {
    this.productsSelect.splice(index, 1);
  }

  calculateTotal(): number {
    return this.productsSelect.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  getProductPrice(name: string): number | null {
    const prod = this.product.find(p => p.name === name);
    return prod ? prod.price : null;
  }

  get today(): Date {
    return new Date();
  }

  makeSale(): void {
    const sale: Sale = {
      productList: this.productsSelect.map(p => p.name),
      price: this.productsSelect.reduce((sum, p) => sum + p.price, 0)
    };

    this.saleService.createSale(sale).subscribe({
      next: (resp) => {
        console.log('Venta registrada:', resp);
        this.lastSale = sale;

        this.productsSelect = [];
        this.categoriesSelectName = '';
        this.categoriesSelectId = null;
        this.productsFilter = [];
      },
      error: (err) => console.error('Error al registrar venta:', err)
    });
  }

  printReceipt(): void {
    const printContents = document.getElementById('receipt')?.innerHTML;
    if (printContents) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Boleta de Venta</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: center; }
                th { background: #eee; }
                .total { text-align: right; font-weight: bold; margin-top: 20px; }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  }

}
