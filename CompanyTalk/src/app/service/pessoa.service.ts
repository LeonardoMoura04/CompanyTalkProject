import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../models/Pessoa';
import { LoginParameters } from '../parameters/login.parameters';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  baseURL = `${environment.baseUrl}Pessoa`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}`);
  }

  getById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseURL}/ById/${id}`);
  }

  getByCpf(cpf: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseURL}/ByCpf/${cpf}`);
  }

  getByDepartmento(departamentoId: number): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}/ByDepartmento/${departamentoId}`);
  }

  getByFuncao(funcaoId: number): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}/ByFuncao/${funcaoId}`);
  }

  post(pessoa: Pessoa) {
    return this.http.post(this.baseURL, pessoa);
  }

  put(pessoa: Pessoa) {
    return this.http.put(`${this.baseURL}/${pessoa.id}`, pessoa);
  }

  desativarAtivarPessoa(pessoa: Pessoa){
    return this.http.put(`${this.baseURL}/desativar-ativar/${pessoa.id}`, pessoa);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  login(loginParameters: LoginParameters): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseURL}/Login`, loginParameters);
  }

}
