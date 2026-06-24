import { Component, signal, inject, ChangeDetectionStrategy, afterNextRender, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../../layout/header.component';
import { FooterComponent } from '../../layout/footer.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';

@Component({
  selector: 'app-contato',
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

  protected readonly site = this.siteService.site;
  protected readonly toastVisible = signal(false);

  protected readonly formNome = signal('');
  protected readonly formEmail = signal('');
  protected readonly formTelefone = signal('');
  protected readonly formAssunto = signal('');
  protected readonly formMensagem = signal('');

  constructor() {
    afterNextRender(() => {
      this.featherService.replace();
    });
  }

  protected onInputChange(field: WritableSignal<string>, event: Event): void {
    field.set((event.target as HTMLInputElement | HTMLSelectElement).value);
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.toastVisible.set(true);
    setTimeout(() => {
      this.toastVisible.set(false);
    }, 4000);
  }
}
