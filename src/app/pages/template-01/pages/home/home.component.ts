import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
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
  cidade: string;
  finalidade: string;
  quartos: string;
}

@Component({
  selector: 'app-home',
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
export class HomeComponent implements OnInit, AfterViewInit {
  site!: Site;
  destaques: Imovel[] = [];
  searchForm: SearchForm = {
    tipo: '',
    cidade: '',
    finalidade: '',
    quartos: '',
  };
  toastVisible = false;

  partnerLogos = [
    { name: 'CRECI', svg: 'shield' },
    { name: 'CAU', svg: 'award' },
    { name: 'SECOVI', svg: 'briefcase' },
    { name: 'CBIC', svg: 'home' },
    { name: 'SINDUSCON', svg: 'tool' },
    { name: 'ABRINC', svg: 'star' },
  ];

  diferenciais = [
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

  heroImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
  ];

  currentHeroIndex = 0;
  private heroInterval: ReturnType<typeof setInterval> | undefined;

  constructor(
    private imovelService: ImovelService,
    private siteService: SiteService,
    private featherService: FeatherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.site = this.siteService.getSite();
    this.destaques = this.imovelService.getImoveisDestaque();

    // Hero image rotation
    this.heroInterval = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.featherService.replace();

    // Refresh UIkit components
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
    this.router.navigate(['/template-01/imoveis'], {
      queryParams: this.getQueryParams(),
    });
  }

  private getQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.searchForm.tipo) params['tipo'] = this.searchForm.tipo;
    if (this.searchForm.cidade) params['cidade'] = this.searchForm.cidade;
    if (this.searchForm.finalidade) params['finalidade'] = this.searchForm.finalidade;
    if (this.searchForm.quartos) params['quartos'] = this.searchForm.quartos;
    return params;
  }

  submitContato(event: Event): void {
    event.preventDefault();
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 4000);
  }
}
