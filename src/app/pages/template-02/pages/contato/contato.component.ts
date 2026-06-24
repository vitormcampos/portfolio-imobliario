import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';

@Component({
  selector: 'app-template02-contato',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    RevealDirective,
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent {
  private readonly siteService = inject(SiteService);
  private readonly featherService = inject(FeatherService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly site = this.siteService.site;

  // Form fields as signals (no FormsModule needed)
  protected readonly contatoNome = signal('');
  protected readonly contatoEmail = signal('');
  protected readonly contatoTelefone = signal('');
  protected readonly contatoAssunto = signal('Quero comprar um imóvel');
  protected readonly contatoMensagem = signal('');

  protected readonly toastVisible = signal(false);

  protected readonly mapUrl = computed((): SafeResourceUrl => {
    const address = this.site().endereco;
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 4000);
  }
}
