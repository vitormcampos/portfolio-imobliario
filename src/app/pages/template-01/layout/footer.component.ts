import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteService } from '../../../shared/services/site.service';
import { Site } from '../../../shared/models/site.model';
import { FeatherService } from '../../../shared/services/feather.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  site!: Site;

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

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
