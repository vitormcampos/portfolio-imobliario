import { Component, signal, inject, ChangeDetectionStrategy, afterNextRender, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { ImovelService } from '../../../../shared/services/imovel.service';
import { SiteService } from '../../../../shared/services/site.service';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare var UIkit: any;

@Component({
  selector: 'app-home',
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

  protected readonly site = this.siteService.site;
  protected readonly destaques = this.imovelService.destaques;
  protected readonly toastVisible = signal(false);
  protected readonly currentHeroIndex = signal(0);

  protected readonly searchTipo = signal('');
  protected readonly searchCidade = signal('');
  protected readonly searchFinalidade = signal('');
  protected readonly searchQuartos = signal('');

  protected readonly partnerLogos = [
    { name: 'CRECI', svg: 'shield' },
    { name: 'CAU', svg: 'award' },
    { name: 'SECOVI', svg: 'briefcase' },
    { name: 'CBIC', svg: 'home' },
    { name: 'SINDUSCON', svg: 'tool' },
    { name: 'ABRINC', svg: 'star' },
  ];

  protected readonly diferenciais = [
    {
      icon: 'user-check',
      title: 'Atendimento Personalizado',
      desc: 'Nosso time dedicado acompanha você em cada etapa, desde a escolha até a entrega das chaves.',
    },
    {
      icon: 'home',
      title: 'Imóveis Premium',
      desc: 'Selecionamos os melhores imóveis do mercado com padrão de qualidade e valorização garantida.',
    },
    {
      icon: 'shield',
      title: 'Suporte Completo',
      desc: 'Da documentação à pós-compra, oferecemos suporte jurídico e administrativo completo.',
    },
  ];

  protected readonly heroImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
  ];

  constructor() {
    // Hero image rotation
    interval(5000).pipe(takeUntilDestroyed()).subscribe(() => {
      this.currentHeroIndex.update(i => (i + 1) % this.heroImages.length);
    });

    afterNextRender(() => {
      this.featherService.replace();
      if (typeof UIkit !== 'undefined') {
        UIkit.refresh();
      }
    });
  }

  protected onSearchChange(field: WritableSignal<string>, event: Event): void {
    field.set((event.target as HTMLSelectElement).value);
  }

  onSearch(): void {
    const params: Record<string, string> = {};
    if (this.searchTipo()) params['tipo'] = this.searchTipo();
    if (this.searchCidade()) params['cidade'] = this.searchCidade();
    if (this.searchFinalidade()) params['finalidade'] = this.searchFinalidade();
    if (this.searchQuartos()) params['quartos'] = this.searchQuartos();
    this.router.navigate(['/template-01/imoveis'], { queryParams: params });
  }

  submitContato(event: Event): void {
    event.preventDefault();
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 4000);
  }
}
