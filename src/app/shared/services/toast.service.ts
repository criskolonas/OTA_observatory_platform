import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root', // or you can add it to app.config.ts if preferred
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  private ToasterVariations =
    {
      'checkValidation': {
        429: {
          severity: 'error',
          summary: 'Error',
          detail: 'Too many requests. Try again later.'

        }
      },
      'login': {
        429: {
          severity: 'error',
          summary: 'Error',
          detail: 'Too many requests. Try again later.'

        }
      },

    }

  showToaster(errorCode:number,destination:string) {
    if(destination && errorCode){
      // @ts-ignore
      this.messageService.add(this.ToasterVariations[destination][errorCode]);
    }
  }

  clear() {
    this.messageService.clear();
  }
}
