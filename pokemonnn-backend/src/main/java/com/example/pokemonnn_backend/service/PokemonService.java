package com.example.pokemonnn_backend.service;

import com.example.pokemonnn_backend.dto.PokemonDTO;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PokemonService {

    public Flux<PokemonDTO> getAllPokemon();
    
    public Mono<PokemonDTO> getPokemonByName(String name);

    public Flux<PokemonDTO> getPokemonByType(String type);

    public Mono<PokemonDTO> getPokemonById(Integer id);

}
