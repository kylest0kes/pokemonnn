import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/PokemonService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  searchBy: 'name' | 'type' = 'name';
  pokemonTypes$?: Observable<string[]>;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonTypes$ = this.pokemonService.getTypes();
  }
}
