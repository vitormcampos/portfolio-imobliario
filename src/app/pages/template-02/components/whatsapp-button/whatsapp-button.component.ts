import { Component, computed, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';

@Component({
  selector: 'app-template02-whatsapp-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
})
export class WhatsappButtonComponent {
  private readonly featherService = inject(FeatherService);
  private readonly siteService = inject(SiteService);

  protected readonly whatsappUrl = computed(
    () => this.siteService.site().urlWhatsapp || 'https://wa.me/5565999545667'
  );

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }
}
