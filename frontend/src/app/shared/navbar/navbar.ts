import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service.';
import { Observable } from 'rxjs';
import { Button } from "../button/button";
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  searchBy: 'name' | 'type' = 'name';
  pokemonTypes$?: Observable<string[]>;
  searchName: string = '';
  searchType: string = '';

  constructor(private pokemonService: PokemonService, private searchService: SearchService) {}

  ngOnInit() {
    this.pokemonTypes$ = this.pokemonService.getTypes();
  }

  getInputValue() {
    const searchTerm = this.searchBy === 'name' ? this.searchName : this.searchType;
    this.searchService.triggerSearch({
      searchTerm,
      searchBy: this.searchBy
    });
  }

  resetSearchTerms() {
    this.searchName = '';
    this.searchType = '';
    this.searchService.resetSearch();
  }

}
