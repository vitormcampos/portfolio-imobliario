import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { ImovelService } from '../../../../shared/services/imovel.service';
import { Imovel } from '../../../../shared/models/imovel.model';

declare var UIkit: any;

@Component({
  selector: 'app-template02-imoveis',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    PropertyCardComponent,
    RevealDirective,
  ],
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css'],
})
export class ImoveisComponent implements OnInit, AfterViewInit {
  allImoveis: Imovel[] = [];
  filteredImoveis: Imovel[] = [];

  filters = {
    tipo: '',
    bairro: '',
    quartos: '',
    valor: '',
  };

  bairros: string[] = [];

  constructor(
    private imovelService: ImovelService,
    private featherService: FeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allImoveis = this.imovelService.getImoveis();
    this.bairros = [...new Set(this.allImoveis.map((i) => i.cidade))].sort();

    this.route.queryParams.subscribe((params) => {
      this.filters.tipo = params['tipo'] || '';
      this.filters.bairro = params['cidade'] || '';
      this.filters.quartos = params['quartos'] || '';
      this.filters.valor = params['valor'] || '';
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
    if (typeof UIkit !== 'undefined') {
      setTimeout(() => {
        UIkit.refresh();
      }, 100);
    }
  }

  applyFilters(): void {
    let result = [...this.allImoveis];

    if (this.filters.tipo) {
      result = result.filter((i) => i.tipo === this.filters.tipo);
    }
    if (this.filters.bairro) {
      result = result.filter((i) =>
        i.cidade.toLowerCase().includes(this.filters.bairro.toLowerCase())
      );
    }
    if (this.filters.quartos) {
      const minQuartos = parseInt(this.filters.quartos, 10);
      if (!isNaN(minQuartos)) {
        result = result.filter((i) => i.quartos >= minQuartos);
      }
    }
    if (this.filters.valor) {
      const maxValor = parseInt(this.filters.valor, 10);
      if (!isNaN(maxValor)) {
        result = result.filter((i) => i.preco <= maxValor);
      }
    }

    // Sort: destaques first, then by price
    result.sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return a.preco - b.preco;
    });

    this.filteredImoveis = result;
  }

  clearFilters(): void {
    this.filters = {
      tipo: '',
      bairro: '',
      quartos: '',
      valor: '',
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  onFilter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getQueryParams(),
      queryParamsHandling: 'merge',
    });
  }

  private getQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.filters.tipo) params['tipo'] = this.filters.tipo;
    if (this.filters.bairro) params['cidade'] = this.filters.bairro;
    if (this.filters.quartos) params['quartos'] = this.filters.quartos;
    if (this.filters.valor) params['valor'] = this.filters.valor;
    return params;
  }
}
