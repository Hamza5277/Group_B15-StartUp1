package com.wildlifetracker.controllers;

import com.wildlifetracker.models.Species;
import com.wildlifetracker.services.SpeciesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// this is the REST controller for species
// it listens for HTTP requests coming from the frontend and responds with JSON
// @RestController combines @Controller and @ResponseBody - everything returned is JSON automaticly
@RestController
@RequestMapping("/api/species") // all endpoints in this class start with /api/species
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
// @CrossOrigin is needed because the frontend (on port 5500) and backend (port 8080) are on diffrent ports
// without this the browser would block the request due to CORS policy (security feature of browsers)
public class SpeciesController {

    // inject the service which handles the actual logic
    // controllers should be thin - they just recieve requests and delegate to the service
    private final SpeciesService service;

    public SpeciesController(SpeciesService service) {
        this.service = service;
    }

    // GET /api/species - returns all species as a JSON array
    // the frontend calls this when the species section loads
    @GetMapping
    public List<Species> getAll() {
        return service.getAll();
    }

    // GET /api/species/{id} - returns a single species by id
    // @PathVariable pulls the {id} value out of the URL e.g. /api/species/3 gives id=3
    // ResponseEntity lets us control the HTTP status code (200 OK or 404 Not Found)
    @GetMapping("/{id}")
    public ResponseEntity<Species> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)          // if found, wrap in 200 OK response
                .orElse(ResponseEntity.notFound().build()); // if not found, return 404
    }

    // POST /api/species - create a new species
    // @RequestBody means spring will parse the JSON from the request body into a Species object
    // we return 201 Created status to indicate something was successfully created
    @PostMapping
    public ResponseEntity<Species> create(@RequestBody Species s) {
        return ResponseEntity.status(201).body(service.create(s));
    }
}
