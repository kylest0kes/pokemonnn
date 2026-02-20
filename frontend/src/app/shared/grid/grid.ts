import { Component, Input } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { Pokecard } from "../../components/pokecard/pokecard";

@Component({
  standalone: true,
  selector: 'app-grid',
  imports: [Pokecard],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid {
  @Input() pokemon: PokemonDTO[] | null = null;

}
