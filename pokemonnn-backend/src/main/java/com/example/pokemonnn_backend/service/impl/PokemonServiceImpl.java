package com.example.pokemonnn_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.pokemonnn_backend.dto.PokemonApiResponseDTO;
import com.example.pokemonnn_backend.dto.PokemonApiResponseResultObjectDTO;
import com.example.pokemonnn_backend.dto.PokemonDTO;
import com.example.pokemonnn_backend.service.PokemonService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PokemonServiceImpl implements PokemonService {

    @Autowired
    private WebClient webClient;

    @Override
    public Flux<PokemonApiResponseDTO> getAllPokemon() {

        Flux<PokemonApiResponseDTO> pokemonApiResponse = webClient.get().uri("/pokemon?limit=20").retrieve().bodyToFlux(PokemonApiResponseDTO.class); 
        pokemonApiResponse.doOnNext(res -> 
            
            System.out.println("api res: " + res)).subscribe();

        return pokemonApiResponse;
    }

    @Override
    public Mono<PokemonDTO> getPokemonByName(String name) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonByName'");
    }

    @Override
    public Flux<PokemonDTO> getPokemonByType(String type) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonByType'");
    }
    
    @Override
    public Mono<PokemonDTO> getPokemonById(Integer id) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonById'");
    }
    
}
