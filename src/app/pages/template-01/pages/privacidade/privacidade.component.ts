import { Component, inject, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    RevealDirective,
  ],
  templateUrl: './privacidade.component.html',
  styleUrls: ['./privacidade.component.css'],
})
export class PrivacidadeComponent {
  private readonly featherService = inject(FeatherService);

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }
}
