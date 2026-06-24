import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Filter signals
  protected readonly tipoFilter = signal('');
  protected readonly bairroFilter = signal('');
  protected readonly quartosFilter = signal('');
  protected readonly valorFilter = signal('');

  protected readonly bairros = computed(() =>
    [...new Set(this.allImoveis().map(i => i.cidade))].sort()
  );

  /** Reactive filtered list derived from allImoveis + filter signals */
  protected readonly filteredImoveis = computed(() => {
    let result: Imovel[] = [...this.allImoveis()];

    const tipo = this.tipoFilter();
    if (tipo) {
      result = result.filter(i => i.tipo === tipo);
    }

    const bairro = this.bairroFilter();
    if (bairro) {
      result = result.filter(i =>
        i.cidade.toLowerCase().includes(bairro.toLowerCase())
      );
    }

    const quartos = this.quartosFilter();
    if (quartos) {
      const minQuartos = parseInt(quartos, 10);
      if (!isNaN(minQuartos)) {
        result = result.filter(i => i.quartos >= minQuartos);
      }
    }

    const valor = this.valorFilter();
    if (valor) {
      const maxValor = parseInt(valor, 10);
      if (!isNaN(maxValor)) {
        result = result.filter(i => i.preco <= maxValor);
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
    // Initialize filters from route snapshot (initial load)
    const params = this.route.snapshot.queryParams;
    if (params['tipo']) this.tipoFilter.set(params['tipo']);
    if (params['cidade']) this.bairroFilter.set(params['cidade']);
    if (params['quartos']) this.quartosFilter.set(params['quartos']);
    if (params['valor']) this.valorFilter.set(params['valor']);

    afterNextRender(() => {
      this.featherService.replace();
      if (typeof UIkit !== 'undefined') {
        setTimeout(() => UIkit.refresh(), 100);
      }
    });
  }

  /** Update route query params when filter changes */
  onFilter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...(this.tipoFilter() && { tipo: this.tipoFilter() }),
        ...(this.bairroFilter() && { cidade: this.bairroFilter() }),
        ...(this.quartosFilter() && { quartos: this.quartosFilter() }),
        ...(this.valorFilter() && { valor: this.valorFilter() }),
      },
      queryParamsHandling: 'merge',
    });
  }

  /** Clear all filters and reset route params */
  clearFilters(): void {
    this.tipoFilter.set('');
    this.bairroFilter.set('');
    this.quartosFilter.set('');
    this.valorFilter.set('');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  /** Handler for select changes — updates the signal and triggers filtering */
  onTipoChange(event: Event): void {
    this.tipoFilter.set((event.target as HTMLSelectElement).value);
    this.onFilter();
  }

  onBairroChange(event: Event): void {
    this.bairroFilter.set((event.target as HTMLSelectElement).value);
    this.onFilter();
  }

  onQuartosChange(event: Event): void {
    this.quartosFilter.set((event.target as HTMLSelectElement).value);
    this.onFilter();
  }

  onValorChange(event: Event): void {
    this.valorFilter.set((event.target as HTMLSelectElement).value);
    this.onFilter();
  }
}
