package com.example.pokemonnn_backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PokemonDTO {

    private int id;

    private String name;

    private List<String> type;

    private int weight;

    private int height;

    private List<String> abilities;

    private String spriteUrl;
    
    // will need to change back to list later, when calling api
    private List<String> species;

    // will need to change back to list later, when calling api
    private String locations;

    private String gender;
    
}
