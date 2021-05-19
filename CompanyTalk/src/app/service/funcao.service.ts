import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcao } from '../models/Funcao';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  baseURL = `${environment.baseUrl}Funcao`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Funcao[]> {
    return this.http.get<Funcao[]>(`${this.baseURL}`);
  }

  getById(id: number): Observable<Funcao> {
    return this.http.get<Funcao>(`${this.baseURL}/${id}`);
  }

  post(funcao: Funcao) {
    return this.http.post(this.baseURL, funcao);
  }

  put(funcao: Funcao) {
    return this.http.put(`${this.baseURL}/${funcao.id}`, funcao);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
