package com.wildlifetracker.backend.controller;

import com.wildlifetracker.backend.entity.Sighting;
import com.wildlifetracker.backend.service.SightingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sightings")
@CrossOrigin(origins = "*")
public class SightingController {

    private final SightingService service;

    public SightingController(SightingService service) {
        this.service = service;
    }

    //  list sightings with filters/sorting
    @GetMapping
    public Page<Sighting> getSightings(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction dir = direction.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        PageRequest pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        return service.listSightings(species, location, pageable);
    }

    //  POST add a new sighting
    @PostMapping
    public Sighting addSighting(@RequestBody Sighting sighting) {
        return service.saveSighting(sighting);
    }
}