package com.example.pokemonnn_backend.service.impl;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.pokemonnn_backend.service.UtilityMethodsService;

@Service
public class UtilityMethodsServiceImpl implements UtilityMethodsService {

    @Override
    public String formatToTitleCase(String str) {
        String withSpaces = str.replaceAll("-", " ");

        return Arrays.stream(withSpaces.split("\\s+"))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }
    
}
