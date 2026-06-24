import { Injectable } from '@angular/core';

declare var feather: any;

@Injectable({
  providedIn: 'root',
})
export class FeatherService {
  /**
   * Replaces all Feather icons in the DOM.
   * Callers are responsible for calling this at the right time
   * (e.g., inside afterNextRender or after DOM mutations).
   * This method is intentionally synchronous — no afterNextRender wrapper,
   * because it may be called from non-injection contexts (router events, etc.).
   */
  replace(): void {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}
