import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FeatherService } from '../../../../shared/services/feather.service';
import { SiteService } from '../../../../shared/services/site.service';
import { Site } from '../../../../shared/models/site.model';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
})
export class WhatsappButtonComponent implements OnInit, AfterViewInit {
  whatsappUrl = 'https://wa.me/5565999545667';

  constructor(
    private featherService: FeatherService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    const site: Site = this.siteService.getSite();
    if (site?.urlWhatsapp) {
      this.whatsappUrl = site.urlWhatsapp;
    }
  }

  ngAfterViewInit(): void {
    this.featherService.replace();
  }
}
