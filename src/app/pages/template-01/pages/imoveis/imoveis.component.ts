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

@Component({
  selector: 'app-imoveis',
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
    cidade: '',
    finalidade: '',
    quartos: '',
  };

  cidades = ['São Paulo', 'Barueri', 'Cotia', 'Osasco', 'Santos'];

  constructor(
    private imovelService: ImovelService,
    private featherService: FeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allImoveis = this.imovelService.getImoveis();

    // Check query params from search
    this.route.queryParams.subscribe((params) => {
      this.filters.tipo = params['tipo'] || '';
      this.filters.cidade = params['cidade'] || '';
      this.filters.finalidade = params['finalidade'] || '';
      this.filters.quartos = params['quartos'] || '';
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
  }

  applyFilters(): void {
    let result = [...this.allImoveis];

    if (this.filters.tipo) {
      result = result.filter((i) => i.tipo === this.filters.tipo);
    }
    if (this.filters.cidade) {
      result = result.filter((i) =>
        i.cidade.toLowerCase().includes(this.filters.cidade.toLowerCase())
      );
    }
    if (this.filters.finalidade) {
      result = result.filter(
        (i) => i.finalidade === this.filters.finalidade
      );
    }
    if (this.filters.quartos) {
      const minQuartos = parseInt(this.filters.quartos, 10);
      if (!isNaN(minQuartos)) {
        result = result.filter((i) => i.quartos >= minQuartos);
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
      cidade: '',
      finalidade: '',
      quartos: '',
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
