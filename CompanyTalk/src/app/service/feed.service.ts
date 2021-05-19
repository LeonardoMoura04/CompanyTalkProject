import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feed } from '../models/Feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  baseURL = `${environment.baseUrl}Feed`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.baseURL}`);
  }

  getById(id: number): Observable<Feed> {
    return this.http.get<Feed>(`${this.baseURL}/ById/${id}`);
  }

  getByDate(dateTime: string): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.baseURL}/ByDate/${dateTime}`);
  }

  post(feed: Feed) {
    return this.http.post(this.baseURL, feed);
  }

  put(feed: Feed) {
    return this.http.put(`${this.baseURL}/${feed.id}`, feed);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
