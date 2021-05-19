import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reuniao } from '../models/Reuniao';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  baseURL = `${environment.baseUrl}Reuniao`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reuniao[]> {
    return this.http.get<Reuniao[]>(`${this.baseURL}`);
  }

  getById(id: number): Observable<Reuniao> {
    return this.http.get<Reuniao>(`${this.baseURL}/ById/${id}`);
  }

  getByDate(dateTime: string): Observable<Reuniao[]> {
    return this.http.get<Reuniao[]>(`${this.baseURL}/ByDate/${dateTime}`);
  }

  post(reuniao: Reuniao) {
    return this.http.post(this.baseURL, reuniao);
  }

  put(reuniao: Reuniao) {
    return this.http.put(`${this.baseURL}/${reuniao.id}`, reuniao);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
