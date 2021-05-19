import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  baseURL = `${environment.baseUrl}Departamento`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.baseURL}`);
  }

  getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseURL}/${id}`);
  }

  post(departamento: Departamento) {
    return this.http.post(this.baseURL, departamento);
  }

  put(departamento: Departamento) {
    return this.http.put(`${this.baseURL}/${departamento.id}`, departamento);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
