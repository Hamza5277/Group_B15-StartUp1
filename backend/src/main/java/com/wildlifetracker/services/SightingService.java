package com.wildlifetracker.services;

import com.wildlifetracker.models.Sighting;
import com.wildlifetracker.repos.SightingRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// service class for sightings - handles the logic for all sighting operations
// same structure as SpeciesService but sightings also support updating (PUT request)
@Service
public class SightingService {

    private final SightingRepository repo;

    // constructor injection of the repository
    public SightingService(SightingRepository repo) {
        this.repo = repo;
    }

    // get all sightings - called when the frontend loads the sightings section
    public List<Sighting> getAll() {
        return repo.findAll();
    }

    // get a specific sighting by its id
    public Optional<Sighting> getById(Long id) {
        return repo.findById(id);
    }

    // save a new sighting submitted from the frontend form
    public Sighting create(Sighting s) {
        return repo.save(s);
    }

    // update an existing sighting (used when user clicks edit)
    // we first check if the sighting exists using findById which returns an Optional
    // if it exists we use .map() to update all its fields and save it
    // if it doesnt exist we return an empty Optional and the controller sends a 404
    public Optional<Sighting> update(Long id, Sighting updated) {
        return repo.findById(id).map(existing -> {
            // copy all the new values onto the existing record
            existing.setSpeciesName(updated.getSpeciesName());
            existing.setLocation(updated.getLocation());
            existing.setDate(updated.getDate());
            existing.setDescription(updated.getDescription());
            existing.setReportedBy(updated.getReportedBy());
            existing.setHealthStatus(updated.getHealthStatus());
            return repo.save(existing); // save and return the updated sighting
        });
    }

    // delete a sighting by id, returns false if it wasnt found
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
