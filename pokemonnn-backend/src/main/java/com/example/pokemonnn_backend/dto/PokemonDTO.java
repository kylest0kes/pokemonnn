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
    
    private List<String> species;

    private List<String> locations;

}
