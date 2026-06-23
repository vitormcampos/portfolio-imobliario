import { Component, Input, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CurrencyPipe } from '@angular/common';
import { Imovel } from '../../../../shared/models/imovel.model';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, NgIf, CurrencyPipe],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements AfterViewInit {
  @Input({ required: true }) imovel!: Imovel;

  constructor(private featherService: FeatherService) {}

  ngAfterViewInit(): void {
    this.featherService.replace();
  }

  isAluguel(): boolean {
    return this.imovel.finalidade === 'aluguel';
  }
}
