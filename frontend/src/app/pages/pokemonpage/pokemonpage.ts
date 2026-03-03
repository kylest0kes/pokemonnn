import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service.';
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonStatSheet } from "../../components/pokemon-stat-sheet/pokemon-stat-sheet";

@Component({
  standalone: true,
  selector: 'app-pokemonpage',
  imports: [CommonModule, PokemonStatSheet],
  templateUrl: './pokemonpage.html',
  styleUrl: './pokemonpage.scss',
})
export class Pokemonpage implements OnInit {
  pokemon: PokemonDTO | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      console.log("param: ", name);
      if (name) {
        this.pokemonService.getPokemonByName(name).subscribe({
          next: (pokemon) => {
            console.log("pokemon data: ", pokemon);
            this.pokemon = pokemon;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log("error: ", err)
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}
