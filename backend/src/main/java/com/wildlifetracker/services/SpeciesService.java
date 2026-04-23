package com.wildlifetracker.services;

import com.wildlifetracker.models.Species;
import com.wildlifetracker.repos.SpeciesRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// the service layer sits between the controller and the repository
// the controller handles HTTP requests, the repository handles database access
// the service contains the actual buisness logic in the middle
// this separation makes the code cleaner and easyer to test
@Service // tells spring this is a service bean, so it can be injected into other classes
public class SpeciesService {

    // we inject the repository using constructor injection (same pattern as DatabaseInit)
    private final SpeciesRepository repo;

    public SpeciesService(SpeciesRepository repo) {
        this.repo = repo;
    }

    // returns all species from the database as a list
    // the controller calls this and spring automaticly converts the list to JSON
    public List<Species> getAll() {
        return repo.findAll();
    }

    // returns a single species by its id
    // Optional<Species> means it might return a Species or might return nothing (if id doesnt exist)
    // we use Optional to avoid null pointer exceptions - its safer than returning null directly
    public Optional<Species> getById(Long id) {
        return repo.findById(id);
    }

    // saves a new species to the database and returns the saved version (with the generated id)
    public Species create(Species s) {
        return repo.save(s);
    }

    // deletes a species by id
    // returns true if it was found and deleted, false if no species with that id exists
    // the controller uses this boolean to decide wether to send a 204 or 404 response
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false; // species not found
        repo.deleteById(id);
        return true; // succesfully deleted
    }
}
