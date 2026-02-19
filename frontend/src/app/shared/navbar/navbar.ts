import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  searchBy: 'name' | 'type' = 'name';
  pokemonTypes: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemonTypes;
  }

  onSearchChange() {
    if (this.searchBy === 'type' && this.pokemonTypes.length === 0) {
      this.loadPokemonTypes();
    }
  }

  loadPokemonTypes() {
    this.http.get<any>("/api/pokemon/type")
      .subscribe({
        next: (data) => {
          for(let i = 0; i < data.length; i++) {
            this.pokemonTypes.push(data[i]);
          }
        },
        error: (err) => {
          console.error("API Error: ", err);
        }
      });
  }

}
