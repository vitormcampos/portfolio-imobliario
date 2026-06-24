import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
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
  selector: 'app-template02-imovel',
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

  protected readonly site = this.siteService.site;

  /** Route paramMap converted to a Signal */
  private readonly paramMap = toSignal(this.route.paramMap, { initialValue: null });

  /** Current imovel derived reactively from the route param */
  protected readonly imovel = computed(() => {
    const params = this.paramMap();
    if (!params) return null;
    const id = Number(params.get('id'));
    if (!id) return null;
    return this.imovelService.getImovelById(id)() ?? null;
  });

  /** Related properties computed from the current imovel */
  protected readonly relacionados = computed(() => {
    const imv = this.imovel();
    if (!imv) return [];
    return this.imovelService.imoveis()
      .filter(i => i.id !== imv.id && (i.tipo === imv.tipo || i.cidade === imv.cidade))
      .slice(0, 3);
  });

  protected readonly currentSlide = signal(0);

  /** Interest form fields as signals */
  protected readonly interesseNome = signal('');
  protected readonly interesseEmail = signal('');
  protected readonly interesseTelefone = signal('');
  protected readonly interesseMensagem = signal('');

  protected readonly toastVisible = signal(false);

  /** Derived labels */
  protected readonly tipoLabel = computed(() => {
    const labels: Record<string, string> = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      comercial: 'Comercial',
      terreno: 'Terreno',
    };
    const imv = this.imovel();
    return imv ? labels[imv.tipo] || imv.tipo : '';
  });

  protected readonly finalidadeLabel = computed(() =>
    this.imovel()?.finalidade === 'venda' ? 'Venda' : 'Aluguel'
  );

  protected readonly whatsappMessage = computed(() => {
    const imv = this.imovel();
    if (!imv) return '';
    const msg = `Olá! Tenho interesse no imóvel "${imv.titulo}" (Cód: ${imv.id}). Poderia me enviar mais informações?`;
    return encodeURIComponent(msg);
  });

  protected readonly whatsappUrl = computed(() =>
    `${this.site().urlWhatsapp}?text=${this.whatsappMessage()}`
  );

  protected readonly mapUrl = computed((): SafeResourceUrl => {
    const imv = this.imovel();
    if (!imv) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=Cuiab%C3%A1%2C%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed'
      );
    }
    const address = `${imv.endereco}, ${imv.cidade}, ${imv.estado}`;
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
      if (typeof UIkit !== 'undefined') {
        setTimeout(() => UIkit.refresh(), 100);
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
  }

  submitInteresse(event: Event): void {
    event.preventDefault();
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 4000);
  }
}
