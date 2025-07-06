import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(message: string, success?: boolean) {
    if (message) {
      this.messageService.add({
        detail: message,
        severity: success ? 'success' : 'error',
      });
    }
  }

  clear() {
    this.messageService.clear();
  }
}
