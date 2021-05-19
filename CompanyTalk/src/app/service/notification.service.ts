import { Injectable } from '@angular/core';
import { Toast } from '@syncfusion/ej2-notifications';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    private toastInstance!: Toast;
    constructor (private storage: SessionStorageService) {}

    public popNotification(message: string) {
        let element = document.createElement("div");
        let model = {
            title: 'Notificação',
            content: message,
            showProgressBar: true,
            timeOut: 5000,
            position: { X: "Left", Y: "Bottom" }
          }
        this.toastInstance = new Toast(model, element);
        this.toastInstance.show();
    }

    public addNotification(notification: any) {
        this.storage.addNotification(notification);
    }

    public getNotification() {
        const notification =  this.storage.getNotification();
        if (notification && notification.message) {
            this.popNotification(notification.message);
        }
    }
}
