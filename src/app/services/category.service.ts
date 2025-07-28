import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin123')
  });

   private apiUrl = 'https://gestiondiprontopizzafullstack.onrender.com/categories';


   constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(this.apiUrl, { headers: this.headers });
    }

    createCategory(category: Category): Observable<Category> {
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
