import { Component, Input } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokecard',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokecard.html',
  styleUrl: './pokecard.scss',
})
export class Pokecard {
  @Input() p: PokemonDTO | null = null;

  get speciesName(): string[] {
    return this.p?.species || ["Unknown"];
  }

  getCardTypeClass(): string {
      return `type-${this.p?.type[0]?.toLowerCase() || 'normal'}`;
  }
}
