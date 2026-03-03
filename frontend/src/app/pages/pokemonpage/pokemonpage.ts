import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon.service.';
import { PokemonDTO } from '../../models/pokemon-dto.interface';

@Component({
  standalone: true,
  selector: 'app-pokemonpage',
  imports: [TitleCasePipe, CommonModule, HttpClientModule],
  templateUrl: './pokemonpage.html',
  styleUrl: './pokemonpage.scss',
})
export class Pokemonpage implements OnInit {
  pokemon: PokemonDTO | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Get the 'name' parameter from the route
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
