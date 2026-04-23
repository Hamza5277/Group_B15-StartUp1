package com.wildlifetracker.backend.service;

import com.wildlifetracker.backend.entity.Sighting;
import com.wildlifetracker.backend.repository.SightingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SightingService {

    private final SightingRepository repository;

    public SightingService(SightingRepository repository) {
        this.repository = repository;
    }

    public Page<Sighting> listSightings(String species, String location, Pageable pageable) {

        boolean hasSpecies = species != null && !species.isBlank();
        boolean hasLocation = location != null && !location.isBlank();

        if (hasSpecies && hasLocation) {
            return repository.findBySpeciesContainingIgnoreCaseAndLocationContainingIgnoreCase(species, location, pageable);
        }

        if (hasSpecies) {
            return repository.findBySpeciesContainingIgnoreCase(species, pageable);
        }

        if (hasLocation) {
            return repository.findByLocationContainingIgnoreCase(location, pageable);
        }

        return repository.findAll(pageable);
    }

  
    public Sighting saveSighting(Sighting sighting) {
        return repository.save(sighting);
    }
}