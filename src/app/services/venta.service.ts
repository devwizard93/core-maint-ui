import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../models/venta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/venta';

  constructor(private http: HttpClient) {}

  agregarVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }
}
