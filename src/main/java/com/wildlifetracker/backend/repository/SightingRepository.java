package com.wildlifetracker.backend.repository;

import com.wildlifetracker.backend.entity.Sighting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SightingRepository extends JpaRepository<Sighting, Long> {

    Page<Sighting> findBySpeciesContainingIgnoreCase(String species, Pageable pageable);

    Page<Sighting> findByLocationContainingIgnoreCase(String location, Pageable pageable);

    Page<Sighting> findBySpeciesContainingIgnoreCaseAndLocationContainingIgnoreCase(
            String species, String location, Pageable pageable
    );
}