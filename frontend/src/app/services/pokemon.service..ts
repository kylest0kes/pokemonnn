import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonDTO } from "../models/pokemon-dto.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonPaginated(offset: number): Observable<PokemonDTO[]> {
    return this.http.get<PokemonDTO[]>(`/api/pokemon?offset=${offset}&limit=52`);
  }

  getPokemonByName(name: string): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`/api/pokemon/name/${name}`);
  }

  getPokemonByType(type: string): Observable<PokemonDTO[]> {
    return this.http.get<PokemonDTO[]>(`/api/pokemon/type/${type}`);
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>("api/pokemon/type");
  }
}
