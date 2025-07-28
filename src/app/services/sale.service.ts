import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../models/sale.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

    private headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin123')
    });


     private apiUrl = 'https://gestiondiprontopizzafullstack.onrender.com/sale';

     constructor(private http: HttpClient) {}

      getAllSale(): Observable<Sale[]> {
        return this.http.get<Sale[]>(this.apiUrl);
      }

      createSale(sale: Sale): Observable<Sale> {
        return this.http.post<Sale>(this.apiUrl, sale, { headers: this.headers });
      }


}
