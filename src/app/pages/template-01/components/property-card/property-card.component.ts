import { Component, input, computed, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Imovel } from '../../../../shared/models/imovel.model';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  private readonly featherService = inject(FeatherService);

  readonly imovel = input.required<Imovel>();

  protected readonly isAluguel = computed(() => this.imovel().finalidade === 'aluguel');

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }
}
