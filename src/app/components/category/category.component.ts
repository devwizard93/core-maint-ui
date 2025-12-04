import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryService, ApiResponse } from '../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  category: Category = this.emptyCategory();
  message: string = '';

  private destroy$ = new Subject<void>(); // Para cancelar suscripciones

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    // Emitimos para cancelar todas las suscripciones activas al cambia de page
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Carga todas las categorías */
  loadCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.destroy$))  /** Suscríbete normalmente… PERO cancela esta suscripción cuando destroy$ emita algo */
      .subscribe({  /** Activa el flujo del observable en el service que dispara la peticion http*/
        next: (response: ApiResponse<Category[]>) => {   /** continua el flujo */
          this.categories = response.data;   // array real
          this.message = response.message;   // guardamos el mensaje del backend
          console.log('Mensaje del backend:', response.message);
        },    /** data y message son propiedades fijas del backend */
        error: (err) => console.error('Error al cargar categorías', err)
      });
  }


  /** Crea o actualiza una categoría */
  createCategory(): void {
    this.message = '';

    if (this.category.id) {
      this.categoryService.updateCategoryById(this.category.id, this.category)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories();
            this.category = this.emptyCategory();
            this.message = 'Categoría actualizada correctamente.';
          },
          error: (err: any) => {
            this.message = err.status === 409 ? err.error?.message : 'Ocurrió un error inesperado.';
          }
        });
    } else {
      /** entonces el metodo devuelve un observable, pero no se ejecuta aun la peticion, el observable
       es perezoso solo describe lo que deberia pasar pero no lo hace aun, el flujo recien se activa cuando haces
       suscribe , hay recien se hace la peticion al backend, se esepera la respuesta , y los datos empiezan a fluir por el
       pipe hacia el next
       Metafora
       La represa (Observable) tiene el agua lista,
       pero el agua no se mueve hasta que abrís la llave (subscribe).
       Cuando abrís la llave, el agua fluye por las cañerías (pipe)
       y llega a tu casa (next).*/
      this.categoryService.createCategory(this.category)
        .pipe(takeUntil(this.destroy$)) /**tubo o canal intermedio por donde pasan esos datos, donde se pueden aplicar transformaciones, filtros o condiciones antes de que lleguen al suscriptor y
        takeuntil Mantén este flujo activo hasta que se emita un valor en this.destroy$ — luego deténlo automáticamente.*/
        .subscribe({   /** activa el Observable (pone en marcha el flujo) y recibe los datos emitidos */
          next: () => { /** es lo que ocurre cada vez que llega un nuevo dato desde el Observable */
            this.loadCategories();
            console.log('Categoria creada correctamente:', this.category);
            this.category = this.emptyCategory();
            this.message = 'Categoría creada correctamente.';

          },
          error: (err) => {
            if (err.status === 409) {
              console.error('Error: nombre duplicado', err.error.message);
            } else {
              console.error('Error al crear categoría', err);
            }
          }
        });
    }
  }


  /** Prepara la categoría para edición */
  editCategory(cat: Category): void {
    this.category = { ...cat };
  }

  /** Elimina una categoría por ID */
  deleteCategoryById(id: number | null): void {
    if (id != null) {
      this.categoryService.deleteCategoryById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.loadCategories());
    }
  }

  /** Cancela la edición */
  cancelEdit(): void {
    this.category = this.emptyCategory();
  }

  /** Retorna una categoría vacía */
  private emptyCategory(): Category {
    return { id: null, name: '' };
  }
}
