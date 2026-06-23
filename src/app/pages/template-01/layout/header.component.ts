import { Component, HostListener, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteService } from '../../../shared/services/site.service';
import { Site } from '../../../shared/models/site.model';
import { FeatherService } from '../../../shared/services/feather.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  site!: Site;
  isScrolled = false;
  isMobileMenuOpen = false;

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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrolled = window.scrollY > 50;
    this.isScrolled = scrolled;
    if (scrolled) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
