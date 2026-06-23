import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    RevealDirective,
  ],
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.css'],
})
export class TermosComponent implements AfterViewInit {
  constructor(private featherService: FeatherService) {}

  ngAfterViewInit(): void {
    this.featherService.replace();
  }
}
