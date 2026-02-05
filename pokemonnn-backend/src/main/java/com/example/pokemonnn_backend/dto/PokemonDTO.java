package com.example.pokemonnn_backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PokemonDTO {

    private int id;

    private String name;

    private String type;

    private int weight;

    private int height;

    private List<String> abilities;

    private List<String> characteristics;

    private String sprite;
    
    private String color;

    private String shape;

    private String species;

    private List<String> locations;

    private String gender;
    
}
