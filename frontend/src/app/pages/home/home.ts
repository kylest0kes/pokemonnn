import { Component } from '@angular/core';
import { Grid } from "../../shared/grid/grid";
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonService } from '../../services/PokemonService';

@Component({
  selector: 'app-home',
  imports: [Grid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pokemon: PokemonDTO[] = [];

  constructor(private pokemonService: PokemonService,) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getAllPokemon()
      .subscribe({
        next: (data) => {
          console.log("pokemon data: ", data);
        },
        error: (err) => {
          console.error("Get All Pokemon Error: ", err);
        }
      })
  }

}
