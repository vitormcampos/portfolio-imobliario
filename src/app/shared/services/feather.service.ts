import { Injectable } from '@angular/core';

declare var feather: any;

@Injectable({
  providedIn: 'root',
})
export class FeatherService {
  replace(): void {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}
