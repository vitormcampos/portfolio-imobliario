import { Component, signal, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteService } from '../../../shared/services/site.service';
import { FeatherService } from '../../../shared/services/feather.service';

@Component({
  selector: 'app-template02-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class HeaderComponent {
  private readonly siteService = inject(SiteService);
  private readonly featherService = inject(FeatherService);

  protected readonly site = this.siteService.site;
  protected readonly isScrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
