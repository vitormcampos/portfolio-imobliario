import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { ImovelService } from '../../../../shared/services/imovel.service';
import { SiteService } from '../../../../shared/services/site.service';
import { Imovel } from '../../../../shared/models/imovel.model';
import { Site } from '../../../../shared/models/site.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var UIkit: any;

@Component({
  selector: 'app-template02-imovel',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CurrencyPipe,
    FormsModule,
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
export class ImovelComponent implements OnInit, AfterViewInit, OnDestroy {
  imovel: Imovel | null = null;
  relacionados: Imovel[] = [];
  site!: Site;
  currentSlide = 0;
  interesseForm = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  };
  toastVisible = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService,
    private siteService: SiteService,
    private featherService: FeatherService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.site = this.siteService.getSite();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = Number(params.get('id'));
      this.imovel = this.imovelService.getImovelById(id) || null;
      if (this.imovel) {
        this.loadRelacionados();
        this.interesseForm.mensagem = `Gostaria de mais informações sobre o ${this.imovel.titulo}. Código: ${this.imovel.id}.`;
      }
      setTimeout(() => {
        if (typeof UIkit !== 'undefined') {
          UIkit.refresh();
        }
      }, 0);
    });
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
    if (typeof UIkit !== 'undefined') {
      setTimeout(() => UIkit.refresh(), 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRelacionados(): void {
    if (!this.imovel) return;
    const all = this.imovelService.getImoveis();
    this.relacionados = all
      .filter(
        (i) =>
          i.id !== this.imovel!.id &&
          (i.tipo === this.imovel!.tipo || i.cidade === this.imovel!.cidade)
      )
      .slice(0, 3);
  }

  getWhatsAppMessage(): string {
    if (!this.imovel) return '';
    const msg = `Olá! Tenho interesse no imóvel "${this.imovel.titulo}" (Cód: ${this.imovel.id}). Poderia me enviar mais informações?`;
    return encodeURIComponent(msg);
  }

  getMapUrl(): SafeResourceUrl {
    if (!this.imovel) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=Cuiab%C3%A1%2C%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed'
      );
    }
    const address = `${this.imovel.endereco}, ${this.imovel.cidade}, ${this.imovel.estado}`;
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getWhatsAppUrl(): string {
    return `${this.site.urlWhatsapp}?text=${this.getWhatsAppMessage()}`;
  }

  getTipoLabel(): string {
    const labels: Record<string, string> = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      comercial: 'Comercial',
      terreno: 'Terreno',
    };
    return this.imovel ? labels[this.imovel.tipo] || this.imovel.tipo : '';
  }

  getFinalidadeLabel(): string {
    return this.imovel?.finalidade === 'venda' ? 'Venda' : 'Aluguel';
  }

  prevSlide(): void {
    if (!this.imovel) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.imovel.fotos.length) %
      this.imovel.fotos.length;
  }

  nextSlide(): void {
    if (!this.imovel) return;
    this.currentSlide =
      (this.currentSlide + 1) % this.imovel.fotos.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  submitInteresse(event: Event): void {
    event.preventDefault();
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 4000);
  }
}
