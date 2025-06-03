import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent {
  private title = inject(Title);
    private meta = inject(Meta);


  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact Page.',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola, mundo, Alejandra, Bernal, Cursos, Angular',
    });
  }
}
