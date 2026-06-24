import { Component, signal, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteService } from '../../../shared/services/site.service';
import { FeatherService } from '../../../shared/services/feather.service';

@Component({
  selector: 'app-header',
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
  protected readonly isMobileMenuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  onWindowScroll(): void {
    const scrolled = window.scrollY > 50;
    this.isScrolled.set(scrolled);
    if (scrolled) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.isMobileMenuOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
