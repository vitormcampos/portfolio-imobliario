import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';
import { Site } from '../../../../shared/models/site.model';

@Component({
  selector: 'app-template02-contato',
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
  contactForm = {
    nome: '',
    email: '',
    telefone: '',
    assunto: 'Quero comprar um imóvel',
    mensagem: '',
  };
  toastVisible = false;

  constructor(
    private siteService: SiteService,
    private featherService: FeatherService,
    private sanitizer: DomSanitizer
  ) {}

  getMapUrl(): SafeResourceUrl {
    if (!this.site) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=Cuiab%C3%A1%2C%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed'
      );
    }
    const address = this.site.endereco;
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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
