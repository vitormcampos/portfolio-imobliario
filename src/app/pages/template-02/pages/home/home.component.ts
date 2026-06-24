import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender, inject, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { ImovelService } from '../../../../shared/services/imovel.service';
import { SiteService } from '../../../../shared/services/site.service';

declare var UIkit: any;

@Component({
  selector: 'app-template02-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    PropertyCardComponent,
    RevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private readonly imovelService = inject(ImovelService);
  private readonly siteService = inject(SiteService);
  private readonly featherService = inject(FeatherService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly site = this.siteService.site;
  protected readonly destaques = this.imovelService.destaques;

  // Search filter signals
  protected readonly tipoFilter = signal('');
  protected readonly bairroFilter = signal('');
  protected readonly quartosFilter = signal('');
  protected readonly valorFilter = signal('');

  protected readonly toastVisible = signal(false);

  protected readonly bairros = computed(() =>
    [...new Set(this.imovelService.imoveis().map(i => i.cidade))].sort()
  );

  protected readonly videos = [
    { title: 'Tour Virtual — Casa de Luxo', youtubeId: 'cmuR7b5dLqc' },
    { title: 'Mansão na Califórnia', youtubeId: 'cXz7eMdiXpA' },
    { title: 'Arquitetura de Luxo — Dubai', youtubeId: 'gPa5AKMu_S0' },
  ];

  protected readonly partnerLogos = [
    { name: 'São Benedito', color: '#e5e5e5' },
    { name: 'Plaenge', color: '#e5e5e5' },
    { name: 'Abittee', color: '#e5e5e5' },
  ];

  protected readonly heroImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
  ];

  protected readonly currentHeroIndex = signal(0);
  protected readonly oldHeroIndex = signal(0);
  protected readonly heroExiting = signal(false);

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
      if (typeof UIkit !== 'undefined') {
        setTimeout(() => UIkit.refresh(), 100);
      }
    });

    // Hero slideshow interval with automatic cleanup
    const interval = setInterval(() => {
      this.oldHeroIndex.set(this.currentHeroIndex());
      this.currentHeroIndex.update(i => (i + 1) % this.heroImages.length);
      setTimeout(() => this.heroExiting.set(true), 50);
      setTimeout(() => {
        this.heroExiting.set(false);
        this.oldHeroIndex.set(this.currentHeroIndex());
      }, 1300);
    }, 5000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  getVideoUrl(youtubeId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSearch(): void {
    this.router.navigate(['/template-02/imoveis'], {
      queryParams: {
        ...(this.tipoFilter() && { tipo: this.tipoFilter() }),
        ...(this.bairroFilter() && { cidade: this.bairroFilter() }),
        ...(this.quartosFilter() && { quartos: this.quartosFilter() }),
      },
    });
  }
}
