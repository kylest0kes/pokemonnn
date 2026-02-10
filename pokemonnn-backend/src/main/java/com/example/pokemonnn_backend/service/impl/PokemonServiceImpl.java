package com.example.pokemonnn_backend.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.pokemonnn_backend.dto.PokemonApiResponseDTO;
import com.example.pokemonnn_backend.dto.PokemonDTO;
import com.example.pokemonnn_backend.service.PokemonService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PokemonServiceImpl implements PokemonService {

    @Autowired
    private WebClient webClient;

    @SuppressWarnings("unchecked")
    @Override
    public Flux<PokemonDTO> getAllPokemon() {

        return webClient.get()
                .uri("/pokemon?limit=20")
                .retrieve()
                .bodyToMono(PokemonApiResponseDTO.class)
                .flatMapMany(res -> Flux.fromIterable(res.getResults()))
                .flatMap(summary -> webClient.get()
                        .uri(summary.getUrl())
                        .retrieve()
                        .bodyToMono(Map.class))
                        .flatMap(pokemonJson -> getPokemonSpecies((String) pokemonJson.get("name"))
                        .map(species -> extractPokemonDto(pokemonJson, species))
                );
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

    @Override
    public List<String> getPokemonLocations(String name) {
        throw new UnsupportedOperationException("Unimplemented method 'getPokemonById'");
    }

    @Override
    public Mono<List<String>> getPokemonSpecies(String name) {
        return webClient.get()
                .uri("/pokemon-species/{name}", name)
                .retrieve()
                .bodyToMono(Map.class)
                .map(this::extractSpecies);
    }

    // extraction helper method
    @SuppressWarnings("uncnhecked")
    private PokemonDTO extractPokemonDto(Map<String, Object> json, List<String> species) {
        PokemonDTO dto = new PokemonDTO();
        dto.setId(((Number) json.get("id")).intValue());
        dto.setName((String) json.get("name"));
        dto.setType(extractTypes(json));
        dto.setWeight(((Number) json.get("weight")).intValue());
        dto.setHeight(((Number) json.get("height")).intValue());
        dto.setAbilities(extractAbilities(json));
        dto.setSpriteUrl(getNestedStrings(json, "sprites", "front_default"));
        // need to make new api to call species url
        dto.setSpecies(species);
        // need to make new api to call locations url
        dto.setLocations("willupdate");
        // need to make new api to call species url because gender for pokemon lives
        // here
        dto.setGender(getNestedStrings(json, "species", "url"));

        return dto;
    }

    @SuppressWarnings("unchecked")
    private List<String> extractSpecies(Map<String, Object> speciesJson) {
        List<Map<String, Object>> eggGroups = (List<Map<String, Object>>) speciesJson.get("egg_groups");
        return eggGroups.stream()
                .map(eggGroup -> (String) eggGroup.get("name"))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private List<String> extractAbilities(Map<String, Object> json) {
        List<Map<String, Object>> abilities = (List<Map<String, Object>>) json.get("abilities");
        return abilities.stream().map(ability -> (String) ((Map<?, ?>) ability.get("ability")).get("name"))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private List<String> extractTypes(Map<String, Object> json) {
        List<Map<String, Object>> types = (List<Map<String, Object>>) json.get("types");
        return types.stream().map(type -> (String) ((Map<?, ?>) type.get("type")).get("name"))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private String getNestedStrings(Map<String, Object> json, String... path) {
        Object current = json;

        for (String key : path) {
            if (current == null)
                return null;
            current = ((Map<String, Object>) current).get(key);
        }

        return current != null ? current.toString() : null;
    }
}
