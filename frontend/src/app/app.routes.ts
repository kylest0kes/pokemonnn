import { Routes } from '@angular/router';
import { Pokemonpage } from './pages/pokemonpage/pokemonpage';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'pokemon/:name',
    component: Pokemonpage
  }
];
