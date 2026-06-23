import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';
import { Site } from '../../../../shared/models/site.model';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    RevealDirective,
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit, AfterViewInit {
  site!: Site;
  toastVisible = false;

  contatoForm = {
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  };

  constructor(
    private siteService: SiteService,
    private featherService: FeatherService
  ) {}

  ngOnInit(): void {
    this.site = this.siteService.getSite();
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 4000);
  }
}
