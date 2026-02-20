import { Component, Input } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';

@Component({
  standalone: true,
  selector: 'app-pokecard',
  imports: [],
  templateUrl: './pokecard.html',
  styleUrl: './pokecard.scss',
})
export class Pokecard {
  @Input() p: PokemonDTO | null = null;

}
