import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private title = inject(Title);
    private meta = inject(Meta);


  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing Page.',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola, mundo, Alejandra, Bernal, Cursos, Angular',
    });
  }
}
