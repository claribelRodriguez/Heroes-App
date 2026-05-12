import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { 
    path: 'heroes', 
    loadComponent: () => import('./features/heroes/pages/heroes-page/heroes-page').then(m => m.HeroesPageComponent) 
  },
];

