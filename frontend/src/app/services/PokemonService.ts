import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonDTO } from "../models/pokemon-dto.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<PokemonDTO[]> {
    return this.http.get<PokemonDTO[]>("/api/pokemon");
  }

  getPokemonByName(): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>("/api/pokemon/name/${name}");
  }

  getPokemonByType(): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>("/api/pokemon/type/${type}");
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>("api/pokemon/type");
  }
}
