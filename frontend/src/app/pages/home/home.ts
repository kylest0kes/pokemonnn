import { Component } from '@angular/core';
import { Grid } from "../../shared/grid/grid";
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonService } from '../../services/PokemonService';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Grid, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pokemon$?: Observable<PokemonDTO[]>;

  constructor(private pokemonService: PokemonService,) {}

  ngOnInit() {
    this.pokemon$ = this.pokemonService.getAllPokemon();
    console.log("home pokemon: ", this.pokemon$);
  }
}
