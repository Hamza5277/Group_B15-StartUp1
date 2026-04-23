package com.wildlifetracker.backend.config;

import com.wildlifetracker.backend.entity.Sighting;
import com.wildlifetracker.backend.repository.SightingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedData {

    @Bean
    CommandLineRunner seedSightings(SightingRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            Sighting s1 = new Sighting();
            s1.setSpecies("Fox");
            s1.setLocation("London");
            s1.setNotes("Seen near the park at dusk.");
            s1.setPhotoUrl("");

            Sighting s2 = new Sighting();
            s2.setSpecies("Hedgehog");
            s2.setLocation("Uxbridge");
            s2.setNotes("Crossing the sidewalk, looked healthy.");
            s2.setPhotoUrl("");

            repo.save(s1);
            repo.save(s2);
        };
    }
}