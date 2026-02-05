package com.example.pokemonnn_backend.service.impl;

import org.springframework.stereotype.Service;

import com.example.pokemonnn_backend.dto.PokemonDTO;
import com.example.pokemonnn_backend.service.PokemonService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PokemonServiceImpl implements PokemonService {

    @Override
    public Flux<PokemonDTO> getAllPokemon() {
        throw new UnsupportedOperationException("Unimplemented method 'getAllPokemon'");
    }

    @Override
    public Mono<PokemonDTO> getPokemonByName(String name) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonByName'");
    }

    @Override
    public Flux<PokemonDTO> getPokemonByType(String type) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonByType'");
    }
    
}

