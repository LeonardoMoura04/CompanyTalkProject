import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../models/Pessoa';

const SESSION_STORAGE_KEY = 'photobuy';

interface INotificationStorage {
  message: string;
  onRouter: string;
}
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly notificationKey = 'notification';

  constructor(private router: Router) {}

  // Get All Items
  fetch(): any[] {
      return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) as string) || [];
  }

  addNotification(notification: INotificationStorage) {
    localStorage.setItem(this.notificationKey, JSON.stringify(notification));
  }

  getNotification(): INotificationStorage {
    const notification =
      JSON.parse(localStorage.getItem(this.notificationKey) as string) || [];
    localStorage.removeItem(this.notificationKey);
    return notification;
  }

  // Delete all
  clear(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  // Save
  add(item: any, key: string): void {
    const items = this.fetch().concat(item);
    localStorage.setItem(key, JSON.stringify(items));
  }

  // // Delete
  delete(item: any): void {
    const items = this.fetch();
    const filteredItems = items.filter((_item) => {
      return _item.id !== item.id;
    });

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(filteredItems));
  }

  getLoggedPerson(): Pessoa {
    const pessoa = JSON.parse(localStorage.getItem('pessoa') as string);
    if(pessoa){
      return pessoa[0] as Pessoa;
    }
    else{
      this.router.navigate([`../login`]);
      throw "Um erro inesperado aconteceu com o login. Logue novamente.";
    }
  }

  logout(): void {
    localStorage.clear();
  }
}
