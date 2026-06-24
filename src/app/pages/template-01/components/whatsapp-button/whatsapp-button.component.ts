import { Component, computed, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
})
export class WhatsappButtonComponent {
  private readonly featherService = inject(FeatherService);
  private readonly siteService = inject(SiteService);

  protected readonly whatsappUrl = computed(() => {
    const site = this.siteService.site();
    return site?.urlWhatsapp || 'https://wa.me/5565999545667';
  });

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }
}
