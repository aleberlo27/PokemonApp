import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component')
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component')
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component')
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component')
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component')
  },
  {
    path: '**',
    redirectTo: () => {
      return 'about';
    }
  },

];
