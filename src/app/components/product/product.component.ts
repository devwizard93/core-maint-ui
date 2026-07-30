import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  private destroy$ = new Subject<void>();

  product: Product = {
    id: null,
    name: '',
    price: 0,
    idCategory: 0,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al cargar productos', error);
      }
    });
  }

   loadCategories(): void {
     this.categoryService.getAllCategories()
       .pipe(takeUntil(this.destroy$))
       .subscribe({
         next: (response: ApiResponse<Category[]>) => {
           this.categories = response.data; // array real para *ngFor
         },
         error: (err) => console.error('Error al cargar categorías:', err)
       });
   }

  getCategoryName(idCategory: number): string {
    const category = this.categories.find(c => c.id === idCategory);
    return category?.name || 'Sin categoría';
  }

  createProduct(): void {
    if (this.product.id) {
      // Update
      this.productService.updateProductById(this.product.id, this.product).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error al actualizar producto', error);
        }
      });
    } else {
      // Create
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error al crear producto', error);
        }
      });
    }
  }

  editProduct(prod: Product): void {
    this.product = { ...prod };
  }

  deleteProductById(id: number | null): void {
    if (id == null) return;
    this.productService.deleteProductById(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error al eliminar producto', error);
      }
    });
  }

  cancelEdit(): void {
    this.product = {
      id: null,
      name: '',
      price: 0,
      idCategory: 0,
    };
  }
}

