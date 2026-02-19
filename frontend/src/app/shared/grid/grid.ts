import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid implements OnChanges{
  @Input() pokemon: PokemonDTO[] | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && this.pokemon) {
      console.log("pokemon data flowing from home: ", this.pokemon);
    }
  }

}
