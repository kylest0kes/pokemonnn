package com.example.pokemonnn_backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PokemonApiResponseDTO {
    
    private Integer count;

    private String next;

    private String previous;

    private List<PokemonApiResponseResultObjectDTO> results;
}
