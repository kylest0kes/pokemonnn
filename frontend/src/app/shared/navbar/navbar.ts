import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  searchBy: 'name' | 'type' = 'name';
  pokemonTypes: string[] = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar', 'unknown'];

  // RE_IMPLEMENT WITH BACKEND API LATER!!!!!!!!!!!
  // ngOnInit() {
  //   this.loadPokemonTypes();
  // }

  onSearchChange() {
    // if (this.searchBy === 'type' && this.pokemonTypes.length === 0) {
    //   this.loadPokemonTypes();
    // }
  }

  // loadPokemonTypes() {
  //   fetch('https://pokeapi.co/v2/type')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.pokemonTypes = data.results.map((t: any) => t.name);
  //     })
  // }

}
