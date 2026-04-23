package com.wildlifetracker.controllers;

import com.wildlifetracker.models.ThreatReport;
import com.wildlifetracker.services.ThreatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// REST controller for threat reports
// almost identical structure to SightingController - supports full CRUD operations
// all endpoints are prefixed with /api/threats
@RestController
@RequestMapping("/api/threats")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class ThreatController {

    private final ThreatService service;

    // spring injects the service using this constructor
    public ThreatController(ThreatService service) {
        this.service = service;
    }

    // GET /api/threats - returns all threat reports as a JSON array
    @GetMapping
    public List<ThreatReport> getAll() {
        return service.getAll();
    }

    // GET /api/threats/{id} - get one specific threat report
    @GetMapping("/{id}")
    public ResponseEntity<ThreatReport> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/threats - submit a new threat report from the form on the frontend
    // responds with 201 Created and the saved object (including its new id)
    @PostMapping
    public ResponseEntity<ThreatReport> create(@RequestBody ThreatReport t) {
        return ResponseEntity.status(201).body(service.create(t));
    }

    // PUT /api/threats/{id} - edit an existing threat report
    // user can update the type, location, severity, description etc
    @PutMapping("/{id}")
    public ResponseEntity<ThreatReport> update(@PathVariable Long id, @RequestBody ThreatReport t) {
        return service.update(id, t)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/threats/{id} - delete a threat report
    // returns 204 if deleted, 404 if it couldnt be found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
