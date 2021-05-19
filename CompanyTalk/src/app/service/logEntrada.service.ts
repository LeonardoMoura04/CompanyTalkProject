import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogEntrada } from '../models/LogEntrada';

@Injectable({
  providedIn: 'root'
})
export class LogEntradaService {

  baseURL = `${environment.baseUrl}LogEntrada`;

  constructor(private http: HttpClient) { }

  getAll(numberOfRows: number = 0): Observable<LogEntrada[]> {
    if(numberOfRows > 0){
      return this.http.get<LogEntrada[]>(`${this.baseURL}/${numberOfRows}`);
    }
    else{
      return this.http.get<LogEntrada[]>(`${this.baseURL}/0`);
    }
  }

  post(LogEntrada: LogEntrada) {
    return this.http.post(this.baseURL, LogEntrada);
  }

}
