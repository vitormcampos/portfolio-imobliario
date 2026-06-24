import { Component, computed, signal, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { ImovelService } from '../../../../shared/services/imovel.service';

@Component({
  selector: 'app-imoveis',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    PropertyCardComponent,
    RevealDirective,
  ],
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css'],
})
export class ImoveisComponent {
  private readonly imovelService = inject(ImovelService);
  private readonly featherService = inject(FeatherService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly allImoveis = this.imovelService.imoveis;
  protected readonly cidades = ['São Paulo', 'Barueri', 'Cotia', 'Osasco', 'Santos'];

  protected readonly filterTipo = signal('');
  protected readonly filterCidade = signal('');
  protected readonly filterFinalidade = signal('');
  protected readonly filterQuartos = signal('');

  protected readonly filteredImoveis = computed(() => {
    let result = [...this.allImoveis()];

    const tipo = this.filterTipo();
    const cidade = this.filterCidade();
    const finalidade = this.filterFinalidade();
    const quartos = this.filterQuartos();

    if (tipo) {
      result = result.filter(i => i.tipo === tipo);
    }
    if (cidade) {
      result = result.filter(i => i.cidade.toLowerCase().includes(cidade.toLowerCase()));
    }
    if (finalidade) {
      result = result.filter(i => i.finalidade === finalidade);
    }
    if (quartos) {
      const minQuartos = parseInt(quartos, 10);
      if (!isNaN(minQuartos)) {
        result = result.filter(i => i.quartos >= minQuartos);
      }
    }

    // Sort: destaques first, then by price
    result.sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return a.preco - b.preco;
    });

    return result;
  });

  constructor() {
    // Initialize filters from query params (e.g., when coming from home page search)
    const params = this.route.snapshot.queryParams;
    if (params['tipo']) this.filterTipo.set(params['tipo']);
    if (params['cidade']) this.filterCidade.set(params['cidade']);
    if (params['finalidade']) this.filterFinalidade.set(params['finalidade']);
    if (params['quartos']) this.filterQuartos.set(params['quartos']);

    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  onFilterChange(field: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    switch (field) {
      case 'tipo': this.filterTipo.set(value); break;
      case 'cidade': this.filterCidade.set(value); break;
      case 'finalidade': this.filterFinalidade.set(value); break;
      case 'quartos': this.filterQuartos.set(value); break;
    }
  }

  clearFilters(): void {
    this.filterTipo.set('');
    this.filterCidade.set('');
    this.filterFinalidade.set('');
    this.filterQuartos.set('');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
