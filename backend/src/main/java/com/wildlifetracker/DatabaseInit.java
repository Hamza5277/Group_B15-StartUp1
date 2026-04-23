package com.wildlifetracker;

import com.wildlifetracker.models.*;
import com.wildlifetracker.repos.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

// this class runs automaticly when the app starts up
// CommandLineRunner means spring will call the run() method straight after booting
// we use it to pre-populate the database with some sample data so the frontend isnt empty
@Component // tells spring to manage this class as a bean (i.e. spring creates it for us)
public class DatabaseInit implements CommandLineRunner {

    // we inject all 4 repositories so we can save data to each table
    // spring handles the dependancy injection for us using the constructor below
    private final SpeciesRepository speciesRepo;
    private final SightingRepository sightingRepo;
    private final ThreatRepository threatRepo;
    private final EcosystemRepository ecosystemRepo;

    // constructor injection - spring sees this and automaticly passes in the repos
    // this is better then using @Autowired directly on the fields
    public DatabaseInit(SpeciesRepository speciesRepo, SightingRepository sightingRepo,
                        ThreatRepository threatRepo, EcosystemRepository ecosystemRepo) {
        this.speciesRepo = speciesRepo;
        this.sightingRepo = sightingRepo;
        this.threatRepo = threatRepo;
        this.ecosystemRepo = ecosystemRepo;
    }

    // this method runs once when the app starts
    // we check if theres already data in the species table first
    // if there is we skip seeding so we dont add duplicates every time the app restarts
    @Override
    public void run(String... args) {
        if (speciesRepo.count() > 0) return; // already seeded, dont run again

        // ── Species ──────────────────────────────────────────────────────────
        // saving 5 species to the database with all there details
        // the ConservationStatus is an enum so we use Species.ConservationStatus.LEAST_CONCERN etc

        speciesRepo.save(new Species(null, "Urban Fox", "Vulpes vulpes",
                Species.ConservationStatus.LEAST_CONCERN,
                "Urban gardens and parks", "Low",
                "Common across UK cities adapted to scavenging and human environments"));
        // null for id because the database will auto generate it

        speciesRepo.save(new Species(null, "West European Hedgehog", "Erinaceus europaeus",
                Species.ConservationStatus.VULNERABLE,
                "Gardens and woodland edges", "Moderate",
                "Important pest controller in serious decline due to habitat loss and road deaths"));

        speciesRepo.save(new Species(null, "European Robin", "Erithacus rubecula",
                Species.ConservationStatus.LEAST_CONCERN,
                "Gardens woodland and hedgerows", "Low",
                "Iconic UK garden bird and important indicator of healthy green spaces"));

        speciesRepo.save(new Species(null, "Common Pipistrelle Bat", "Pipistrellus pipistrellus",
                Species.ConservationStatus.NEAR_THREATENED,
                "Urban and rural areas near water", "Moderate",
                "Vital insect controller facing threats from light pollution and roost disturbance"));

        speciesRepo.save(new Species(null, "Barn Owl", "Tyto alba",
                Species.ConservationStatus.VULNERABLE,
                "Open farmland and grassland", "High",
                "Silent nocturnal hunter severely affected by habitat loss and rodenticide poisoning"));

        // ── Sightings ─────────────────────────────────────────────────────────
        // these are example sightings that people might have reported
        // LocalDate.of(year, month, day) is how we create a specific date in java

        sightingRepo.save(new Sighting(null, "Urban Fox", "Hampstead Heath London",
                LocalDate.of(2024, 11, 12),
                "Healthy adult fox spotted near picnic area at dusk", "Jane Smith", "Healthy"));

        sightingRepo.save(new Sighting(null, "West European Hedgehog", "Richmond Park London",
                LocalDate.of(2024, 10, 5),
                "Small hedgehog found foraging in leaf litter", "Tom Patel", "Healthy"));

        sightingRepo.save(new Sighting(null, "European Robin", "Hyde Park London",
                LocalDate.of(2025, 1, 20),
                "Robin singing from low branch near the Serpentine", "Amy Clarke", "Healthy"));

        sightingRepo.save(new Sighting(null, "Barn Owl", "Epping Forest Essex",
                LocalDate.of(2024, 9, 30),
                "Barn owl hunting at field edge just after sunset", "Mark Evans", "Healthy"));

        sightingRepo.save(new Sighting(null, "Common Pipistrelle Bat", "Regent's Canal London",
                LocalDate.of(2025, 2, 14),
                "Small bats observed feeding over canal at dusk", "Sara Nguyen", "Healthy"));

        // ── Threat Reports ────────────────────────────────────────────────────
        // these are sample threats to show on the frontend
        // severity is just a plain string here (LOW, MODERATE, HIGH etc)

        threatRepo.save(new ThreatReport(null, "HABITAT_LOSS", "Epping Forest Essex",
                "HIGH",
                "Large section of woodland cleared for new housing development",
                "Local Resident"));

        threatRepo.save(new ThreatReport(null, "POLLUTION", "Thames Riverside London",
                "MODERATE",
                "Industrial runoff observed entering river affecting waterbirds and fish",
                "Environmental Watch"));

        threatRepo.save(new ThreatReport(null, "HUMAN_ACTIVITY", "Hampstead Heath London",
                "LOW",
                "Dog walkers repeatedly entering protected nesting areas during bird breeding season",
                "Heath Warden"));

        // ── Ecosystem Stages ──────────────────────────────────────────────────
        // these 8 stages power the timelapse visualisation on the frontend
        // each one represents a diffrent year showing the decline of an ecosystem over time
        // stageNumber is used to order them corectly when retrieved from the database

        ecosystemRepo.save(new EcosystemStage(null, 1, "1990", "Healthy Ecosystem",
                "Thriving savanna with abundant wildlife - elephants, zebras, and giraffes roam freely",
                "150+ species", "HEALTHY"));

        ecosystemRepo.save(new EcosystemStage(null, 2, "1995", "Early Warning Signs",
                "First signs of environmental stress appear. Slight decline in animal populations",
                "130 species", "WARNING"));

        ecosystemRepo.save(new EcosystemStage(null, 3, "2000", "Noticeable Decline",
                "Wildlife populations noticeably reduced. Grass becoming patchy some trees dying",
                "95 species", "WARNING"));

        ecosystemRepo.save(new EcosystemStage(null, 4, "2005", "Significant Habitat Loss",
                "Major habitat fragmentation. Few animals remain as drought conditions worsen",
                "60 species", "DANGER"));

        ecosystemRepo.save(new EcosystemStage(null, 5, "2010", "Severe Degradation",
                "Almost no wildlife visible. Desertification advancing rapidly across the region",
                "25 species", "CRITICAL"));

        ecosystemRepo.save(new EcosystemStage(null, 6, "2015", "Near Complete Collapse",
                "Ecosystem on brink of collapse. No large animals survive vegetation nearly gone",
                "12 species", "CRITICAL"));

        ecosystemRepo.save(new EcosystemStage(null, 7, "2020", "Nearly Barren",
                "Only scattered dead vegetation remains. Soil exposed and cracking from drought",
                "5 species", "CRITICAL"));

        ecosystemRepo.save(new EcosystemStage(null, 8, "2025", "Total Ecosystem Collapse",
                "What was once thriving savanna is now barren desert. Complete biodiversity loss",
                "0 species", "DEAD"));
    }
}
