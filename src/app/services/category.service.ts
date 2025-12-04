import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

export interface ApiResponse<T> {
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin123')
  });

  private apiUrl = 'http://localhost:8080/api/categories';


  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ApiResponse<Category[]>> {  /** El flujo continua hacia el next */
    return this.http.get<ApiResponse<Category[]>>(this.apiUrl, { headers: this.headers });   /** escriba observable o no este metodo devuelve automaticamente un observable  */
  }


  createCategory(category: Category): Observable<Category> {   /**(Desribe lo que deberia pasar )es el canal que genera y emite los datos) */
    return this.http.post<Category>(this.apiUrl, category, { headers: this.headers });
  }

  updateCategoryById(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }


  deleteCategoryById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.headers
    });
  }


}
