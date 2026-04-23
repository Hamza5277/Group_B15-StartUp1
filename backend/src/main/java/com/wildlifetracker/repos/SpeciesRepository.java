package com.wildlifetracker.repos;

import com.wildlifetracker.models.Species;
import org.springframework.data.jpa.repository.JpaRepository;

// this is the repository interface for the Species entity
// we extend JpaRepository which gives us all the basic database operations for free
// JpaRepository<Species, Long> means: work with Species objects, and the id type is Long
// we get methods like: findAll(), findById(), save(), deleteById(), count() etc
// we dont need to write any SQL, spring data jpa generates it all automaticly
public interface SpeciesRepository extends JpaRepository<Species, Long> {
    // no custom methods needed here, the built-in ones are enough for species
}
