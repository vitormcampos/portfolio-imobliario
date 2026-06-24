import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { FeatherService } from '../../../../shared/services/feather.service';

@Component({
  selector: 'app-template02-termos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.css'],
})
export class TermosComponent implements AfterViewInit {
  constructor(private featherService: FeatherService) {}

  ngAfterViewInit(): void {
    this.featherService.replace();
  }
}
