import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-template02-privacidade',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './privacidade.component.html',
  styleUrls: ['./privacidade.component.css'],
})
export class PrivacidadeComponent implements AfterViewInit {
  constructor(private featherService: FeatherService) {}

  ngAfterViewInit(): void {
    this.featherService.replace();
  }
}
