package com.example.pokemonnn_backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TypeApiResponseDTO {

    Integer count;

    String next;

    String previous;

    List<TypeApiResponseResultsDTO> results;
    
}
