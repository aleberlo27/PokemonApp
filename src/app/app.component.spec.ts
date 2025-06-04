import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './../app/shared/components/navbar/navbar.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture:  ComponentFixture<AppComponent>;
  // let app: AppComponent;
  let compiled: HTMLDivElement;

  //Mock del navbar que tiene dentro el app.component.ts
  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>Hola mundo</h1>`, //ESTO ES LO QUE SALDRÍA EN EL HTML DEL NAVBAR COMPONENT MOCKEADO
  })
  class NavbarComponentMock {}

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      },
    });

    //      !!!!! RECOMENDADO !!!!!!
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [provideRouter([])]
    // }).overrideComponent(AppComponent, {
    //   add: {
    //     imports: [NavbarComponentMock] //importamos el mock del navbar en el app.component
    //   },
    //   remove: {
    //     imports: [NavbarComponent] //eliminamos el componente real (navbar) del app.component
    //   }
    // }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;

    console.log(compiled);

    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet `, () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it(``, () => {
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, server-side-renderingSSR');
  // });
});
