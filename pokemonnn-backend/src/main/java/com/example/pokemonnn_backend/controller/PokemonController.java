package com.example.pokemonnn_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pokemonnn_backend.service.PokemonService;
import com.example.pokemonnn_backend.dto.PokemonDTO;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// rest controller is a controller that auto converts java object to json
@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    // auto creates PokemonService bean and injects into controller at start
    @Autowired
    private PokemonService pokemonService;
    
    // mapping for the '/api/pokemon' route which returns a stream of PokemonDTOs using the service method
    @GetMapping("")
    public Flux<PokemonDTO> getAllPokemon() {
        return pokemonService.getAllPokemon();
    }
    
    // mapping for the '/api/pokemon/{name}' route which returns a single PokemonDTO using the service method
    @GetMapping("/{name}")
    public Mono<PokemonDTO> getPokemonByName(@PathVariable String name) {
        return pokemonService.getPokemonByName(name);
    }

    // mapping for the '/api/pokemon/{type}' route which returns a stream of PokemonDTOs using the service method
    @GetMapping("/{type}")
    public Flux<PokemonDTO> getPokemonByType(@PathVariable String type) {
        return pokemonService.getPokemonByType(type);
    }

    // mapping for the '/api/pokemon/{id}' route which returns a PokemonDTO using the service method
    @GetMapping("/{id}")
    public Flux<PokemonDTO> getPokemonById(@PathVariable String type) {
        return pokemonService.getPokemonByType(type);
    }
}
