import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appRevealDelay = 0;
  @Input() appRevealThreshold = 0.15;

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translateY(30px)'
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      `opacity 0.6s ease ${this.appRevealDelay}ms, transform 0.6s ease ${this.appRevealDelay}ms`
    );

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            'translateY(0)'
          );
          this.renderer.addClass(this.el.nativeElement, 'revealed');
          this.observer?.disconnect();
        }
      },
      { threshold: this.appRevealThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
