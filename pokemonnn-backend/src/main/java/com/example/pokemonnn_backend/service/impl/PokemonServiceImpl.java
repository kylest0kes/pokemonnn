package com.example.pokemonnn_backend.service.impl;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.example.pokemonnn_backend.dto.PokemonApiResponseDTO;
import com.example.pokemonnn_backend.dto.PokemonDTO;
import com.example.pokemonnn_backend.dto.PokemonTypesApiResponseDTO;
import com.example.pokemonnn_backend.service.PokemonService;
import com.example.pokemonnn_backend.service.UtilityMethodsService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class PokemonServiceImpl implements PokemonService {

    private final WebClient webClient;
    private final UtilityMethodsService utilityMethodsService;

    // constructor injection of dependencies
    public PokemonServiceImpl(WebClient webClient, UtilityMethodsService utilityMethodsService) {
        this.webClient = webClient;
        this.utilityMethodsService = utilityMethodsService;
    }

    @Override
    public Flux<PokemonDTO> getAllPokemon() {

        return webClient.get()
                .uri("/pokemon?limit=20")
                .retrieve()
                .bodyToMono(PokemonApiResponseDTO.class)
                .timeout(Duration.ofSeconds(13))
                .retry(4)
                .flatMapMany(res -> Flux.fromIterable(res.getResults()))
                .flatMap(summary -> fetchSinglePokemon(summary.getUrl())
                    .onErrorResume(WebClientResponseException.NotFound.class, e -> {
                        log.warn("Pokemon not found: {}", summary.getName(), e);
                        return Mono.empty();
                    })
                    .onErrorResume(Exception.class, e -> {
                        log.error("Failed to fetch Pokemon: {}", summary.getName(), e);
                        return Mono.empty();
                    })
                ); 
    }

    @Override
    public Mono<PokemonDTO> getPokemonByName(String name) {
        return fetchSinglePokemon("/pokemon/" + name)
                .timeout(Duration.ofSeconds(13))
                .retry(4)
                .onErrorResume(WebClientResponseException.NotFound.class, e -> {
                    log.warn("Pokemon not found: {}", name, e);
                    return Mono.empty();
                })
                .onErrorResume(Exception.class, e -> {
                    log.error("Failed to fetch Pokemon: {}", name, e);
                    return Mono.empty();
                });
    }

    @Override
    public Flux<PokemonDTO> getPokemonByType(String type) {
        return webClient.get()
                .uri("/type/{type}", type)
                .retrieve()
                .bodyToMono(PokemonTypesApiResponseDTO.class)
                .timeout(Duration.ofSeconds(13))
                .retry(4)
                .flatMapMany(res -> Flux.fromIterable(res.getPokemon()))
                .flatMap(typeResult -> fetchSinglePokemon(typeResult.getPokemon().getUrl())
                    .onErrorResume(WebClientResponseException.NotFound.class, e -> {
                        log.warn("Pokemon not found: {}", typeResult.getPokemon().getName(), e);
                        return Mono.empty();
                    })
                    .onErrorResume(Exception.class, e -> {
                        log.error("Failed to fetch Pokemon: {}", typeResult.getPokemon().getName(), e);
                        return Mono.empty();
                    })
                );
    }

    @Override
    public Mono<List<String>> getPokemonLocations(String name) {
        return webClient.get()
                .uri("/pokemon/{name}/encounters", name)
                .retrieve()
                .bodyToMono(Object.class)
                .map(this::extractLocations);
    }

    @Override
    public Mono<List<String>> getPokemonSpecies(String name) {
        return webClient.get()
                .uri("/pokemon-species/{name}", name)
                .retrieve()
                .bodyToMono(Map.class)
                .map(this::extractSpecies);
    }

    private Mono<PokemonDTO> fetchSinglePokemon(String pokemonUrl) {
        return webClient.get()
                .uri(pokemonUrl)
                .retrieve()
                .bodyToMono(Map.class)
                .timeout(Duration.ofSeconds(5))
                .flatMap(this::enrichAndExtractPokemon);
    }

    private Mono<PokemonDTO> enrichAndExtractPokemon(Map<String, Object> pokemonJson) {
        String name = (String) pokemonJson.get("name");
        return Mono.zip(
            getPokemonSpecies(name).onErrorReturn(List.of()),
            getPokemonLocations(name).onErrorReturn(List.of())
        )
        .map(tuple -> extractPokemonDto(pokemonJson, tuple.getT1(), tuple.getT2()));
    }

    // extraction helper method
    private PokemonDTO extractPokemonDto(Map<String, Object> json, List<String> species, List<String> locations) {
        PokemonDTO dto = new PokemonDTO();
        dto.setId(((Number) json.get("id")).intValue());
        dto.setName((String) json.get("name"));
        dto.setType(extractTypes(json));
        dto.setWeight(((Number) json.get("weight")).intValue());
        dto.setHeight(((Number) json.get("height")).intValue());
        dto.setAbilities(extractAbilities(json));
        dto.setSpriteUrl(getNestedStrings(json, "sprites", "front_default"));
        dto.setSpecies(species);
        dto.setLocations(locations);

        return dto;
    }

    @SuppressWarnings("unchecked")
    private List<String> extractLocations(Object locationsJson) {
        List<Map<String, Object>> locations = (List<Map<String, Object>>) locationsJson;
        return locations.stream()
                .map(location -> utilityMethodsService.formatToTitleCase(getNestedStrings((Map<String, Object>) location, "location_area", "name")))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
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
