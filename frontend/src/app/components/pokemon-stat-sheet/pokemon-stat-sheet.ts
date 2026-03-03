import { Component, Input } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';

@Component({
  standalone: true,
  selector: 'app-pokemon-stat-sheet',
  imports: [],
  templateUrl: './pokemon-stat-sheet.html',
  styleUrl: './pokemon-stat-sheet.scss',
})
export class PokemonStatSheet {
  @Input() chosenPokemon: PokemonDTO | null = null;

}
