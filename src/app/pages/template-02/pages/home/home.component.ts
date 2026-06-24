import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

declare var UIkit: any;

interface SearchForm {
  tipo: string;
  bairro: string;
  quartos: string;
  valor: string;
}

@Component({
  selector: 'app-template02-home',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  site!: Site;
  destaques: Imovel[] = [];
  searchForm: SearchForm = {
    tipo: '',
    bairro: '',
    quartos: '',
    valor: '',
  };
  toastVisible = false;

  bairros: string[] = [];

  videos = [
    {
      title: 'Tour Virtual — Casa de Luxo',
      youtubeId: 'cmuR7b5dLqc',
    },
    {
      title: 'Mansão na Califórnia',
      youtubeId: 'cXz7eMdiXpA',
    },
    {
      title: 'Arquitetura de Luxo — Dubai',
      youtubeId: 'gPa5AKMu_S0',
    },
  ];

  partnerLogos = [
    { name: 'São Benedito', color: '#e5e5e5' },
    { name: 'Plaenge', color: '#e5e5e5' },
    { name: 'Abittee', color: '#e5e5e5' },
  ];

  heroImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
  ];

  currentHeroIndex = 0;
  oldHeroIndex = 0;
  heroExiting = false;
  private heroInterval: ReturnType<typeof setInterval> | undefined;

  constructor(
    private imovelService: ImovelService,
    private siteService: SiteService,
    private featherService: FeatherService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  getVideoUrl(youtubeId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.site = this.siteService.getSite();
    this.destaques = this.imovelService.getImoveisDestaque().slice(0, 6);

    // Derive bairros from imoveis cities
    const imoveis = this.imovelService.getImoveis();
    this.bairros = [...new Set(imoveis.map((i) => i.cidade))].sort();

    this.heroInterval = setInterval(() => {
      this.oldHeroIndex = this.currentHeroIndex;
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
      // Start fade-out of old layer after a tick
      setTimeout(() => {
        this.heroExiting = true;
      }, 50);
      // Reset after transition completes
      setTimeout(() => {
        this.heroExiting = false;
        this.oldHeroIndex = this.currentHeroIndex;
      }, 1300);
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
    if (typeof UIkit !== 'undefined') {
      setTimeout(() => {
        UIkit.refresh();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }
  }

  onSearch(): void {
    this.router.navigate(['/template-02/imoveis'], {
      queryParams: this.getQueryParams(),
    });
  }

  private getQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.searchForm.tipo) params['tipo'] = this.searchForm.tipo;
    if (this.searchForm.bairro) params['cidade'] = this.searchForm.bairro;
    if (this.searchForm.quartos) params['quartos'] = this.searchForm.quartos;
    return params;
  }
}
