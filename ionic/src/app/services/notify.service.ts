import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    dismissible: true,
    position: { x: 'center', y: 'top' }
  });

  success(message: string) {
    this.notyf.success(message);
  }
  
  error(message: string) {
    this.notyf.error(message);
  }
  
  info(message: string) {
    this.notyf.open({
      type: 'info',
      message: message
    });
  }
  
  warning(message: string) {
    this.notyf.open({
      type: 'warning',
      message: message
    });

  }

}
