import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/PokemonService';
import { Observable } from 'rxjs';
import { Button } from "../button/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, Button],
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
