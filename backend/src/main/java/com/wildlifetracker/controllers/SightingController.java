package com.wildlifetracker.controllers;

import com.wildlifetracker.models.Sighting;
import com.wildlifetracker.services.SightingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// REST controller for sightings
// this one supports full CRUD - GET, POST, PUT and DELETE
// the frontend uses all 4 to display, add, edit and remove sightings
@RestController
@RequestMapping("/api/sightings")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class SightingController {

    private final SightingService service;

    public SightingController(SightingService service) {
        this.service = service;
    }

    // GET /api/sightings - fetch all sightings and return them as JSON
    @GetMapping
    public List<Sighting> getAll() {
        return service.getAll();
    }

    // GET /api/sightings/{id} - fetch a single sighting by id
    // returns 200 with the sighting if found, or 404 if not
    @GetMapping("/{id}")
    public ResponseEntity<Sighting> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/sightings - submit a new sighting from the frontend form
    // spring converts the request body JSON into a Sighting object automaticly
    // we respond with 201 Created and the saved sighting (which now has an id)
    @PostMapping
    public ResponseEntity<Sighting> create(@RequestBody Sighting s) {
        return ResponseEntity.status(201).body(service.create(s));
    }

    // PUT /api/sightings/{id} - update an existing sighting
    // the user clicks edit, changes some fields, and submits the form
    // the id in the URL tells us which sighting to update
    // the request body contains the new values to overwrite with
    @PutMapping("/{id}")
    public ResponseEntity<Sighting> update(@PathVariable Long id, @RequestBody Sighting s) {
        return service.update(id, s)
                .map(ResponseEntity::ok)                     // updated succesfully - return 200
                .orElse(ResponseEntity.notFound().build());  // sighting not found - return 404
    }

    // DELETE /api/sightings/{id} - remove a sighting permanently
    // returns 204 No Content on success (standard HTTP response for a succesfull delete)
    // returns 404 if the sighting doesnt exist
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()        // 204 - deleted ok
                : ResponseEntity.notFound().build();        // 404 - wasnt found
    }
}
