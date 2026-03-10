import { Component, Input } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokemon-stat-sheet',
  imports: [TitleCasePipe, DecimalPipe],
  templateUrl: './pokemon-stat-sheet.html',
  styleUrl: './pokemon-stat-sheet.scss',
})
export class PokemonStatSheet {
  @Input() chosenPokemon: PokemonDTO | null = null;

  getDetailsTypeClass(): string {
    return this.chosenPokemon?.type?.[0]
      ? `type-${this.chosenPokemon.type[0].toLowerCase()}`
      : '';
  }
}
