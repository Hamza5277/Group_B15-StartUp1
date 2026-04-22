package com.wildlifetracker.repos;

import com.wildlifetracker.models.Sighting;
import org.springframework.data.jpa.repository.JpaRepository;

// repository for the Sighting entity
// same as SpeciesRepository - extends JpaRepository to get all standard CRUD methods
// CRUD stands for Create, Read, Update, Delete - the 4 basic database operations
// JpaRepository<Sighting, Long> = we are working with Sighting objects and the id is a Long
public interface SightingRepository extends JpaRepository<Sighting, Long> {
    // no custom queries needed, findAll / findById / save / deleteById covers everthing we need
}
