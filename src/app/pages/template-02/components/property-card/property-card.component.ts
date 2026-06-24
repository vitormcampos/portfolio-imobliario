import { Component, input, computed, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Imovel } from '../../../../shared/models/imovel.model';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-template02-property-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  private readonly featherService = inject(FeatherService);

  readonly imovel = input.required<Imovel>();

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  protected readonly isAluguel = computed(() => this.imovel().finalidade === 'aluguel');
}
