import { Component, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteService } from '../../../shared/services/site.service';
import { FeatherService } from '../../../shared/services/feather.service';

@Component({
  selector: 'app-template02-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  private readonly siteService = inject(SiteService);
  private readonly featherService = inject(FeatherService);

  protected readonly site = this.siteService.site;

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
