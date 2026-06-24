import { Component, computed, signal, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
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
  selector: 'app-imovel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    PropertyCardComponent,
    RevealDirective,
  ],
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css'],
})
export class ImovelComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly imovelService = inject(ImovelService);
  private readonly siteService = inject(SiteService);
  private readonly featherService = inject(FeatherService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly params = toSignal(this.route.paramMap, { initialValue: null });

  protected readonly site = this.siteService.site;
  protected readonly currentSlide = signal(0);

  protected readonly imovel = computed(() => {
    const id = Number(this.params()?.get('id'));
    return id ? this.imovelService.getImovelById(id)() : undefined;
  });

  protected readonly relacionados = computed(() => {
    const imovel = this.imovel();
    if (!imovel) return [];
    return this.imovelService.imoveis().filter(
      i => i.id !== imovel.id && (i.tipo === imovel.tipo || i.cidade === imovel.cidade)
    ).slice(0, 3);
  });

  protected readonly tipoLabel = computed(() => {
    const imovel = this.imovel();
    if (!imovel) return '';
    const labels: Record<string, string> = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      comercial: 'Comercial',
      terreno: 'Terreno',
    };
    return labels[imovel.tipo] || imovel.tipo;
  });

  protected readonly finalidadeLabel = computed(() => {
    return this.imovel()?.finalidade === 'venda' ? 'Venda' : 'Aluguel';
  });

  protected readonly whatsappMessage = computed(() => {
    const imovel = this.imovel();
    if (!imovel) return '';
    return encodeURIComponent(
      `Olá! Tenho interesse no imóvel "${imovel.titulo}" (Cód: ${imovel.id}). Poderia me enviar mais informações?`
    );
  });

  protected readonly whatsappUrl = computed(() => {
    const site = this.site();
    const message = this.whatsappMessage();
    return `${site.urlWhatsapp}?text=${message}`;
  });

  protected readonly mapUrl = computed<SafeResourceUrl>(() => {
    const imovel = this.imovel();
    if (!imovel) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=Cuiab%C3%A1%2C%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed'
      );
    }
    const address = `${imovel.endereco}, ${imovel.cidade}, ${imovel.estado}`;
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
      if (typeof UIkit !== 'undefined') {
        UIkit.refresh();
      }
    });
  }

  prevSlide(): void {
    const fotos = this.imovel()?.fotos;
    if (!fotos || fotos.length === 0) return;
    this.currentSlide.update(i => (i - 1 + fotos.length) % fotos.length);
  }

  nextSlide(): void {
    const fotos = this.imovel()?.fotos;
    if (!fotos || fotos.length === 0) return;
    this.currentSlide.update(i => (i + 1) % fotos.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    if (typeof UIkit !== 'undefined') {
      const el = document.querySelector('[uk-slideshow]');
      if (el) {
        UIkit.slideshow(el).show(index);
      }
    }
  }
}
