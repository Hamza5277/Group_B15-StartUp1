package com.wildlifetracker.models;

import jakarta.persistence.*;

// this is the Species model / entity
// it maps directly to a table called "species" in the database
// each field below becomes a column in that table
@Entity // tells JPA/hibernate that this class is a database table
@Table(name = "species") // specifies the exact table name to use
public class Species {

    // @Id marks this as the primary key column
    // @GeneratedValue means the database will auto-increment the id for us
    // we dont need to set it manualy when creating new records
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // the common english name of the species e.g. "Red Fox"
    private String commonName;

    // the scientific/latin name e.g. "Vulpes vulpes"
    private String scientificName;

    // conservation status stored as an enum (see inner class below)
    // @Enumerated(STRING) means it saves the name as text in the db not a number
    // so instead of storing 0 or 1 it stores "LEAST_CONCERN" etc which is more readable
    @Enumerated(EnumType.STRING)
    private ConservationStatus conservationStatus;

    // where this animal typicaly lives
    private String habitat;

    // how threatened this species is (low, moderate, high) - seperate from conservation status
    private String threatLevel;

    // a breif description of the species and any notable behaviours
    private String description;

    // enum to represent the possible conservation statuses
    // using an enum is better than a plain string because it limits the values to only valid options
    // if someone tried to pass "EXTINCT_MAYBE" it would fail rather then save bad data
    public enum ConservationStatus {
        LEAST_CONCERN,       // population is stable, not at risk
        NEAR_THREATENED,     // might become threatened soon
        VULNERABLE,          // at risk of extinction if threats continue
        ENDANGERED,          // high risk of extinction
        CRITICALLY_ENDANGERED, // extremley high risk of extinction
        EXTINCT              // no longer exists in the wild
    }

    // empty constructor is required by JPA / hibernate
    // hibernate needs to be able to create an empty object and then fill in the fields
    public Species() {}

    // full constructor for creating species objects with all fields
    public Species(Long id, String commonName, String scientificName,
                   ConservationStatus conservationStatus, String habitat,
                   String threatLevel, String description) {
        this.id = id;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.conservationStatus = conservationStatus;
        this.habitat = habitat;
        this.threatLevel = threatLevel;
        this.description = description;
    }

    // getters and setters below - needed so jackson can serialise/deserialise the object to JSON
    // without these the REST API wouldnt be able to convert species objects to JSON and back

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCommonName() { return commonName; }
    public void setCommonName(String commonName) { this.commonName = commonName; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public ConservationStatus getConservationStatus() { return conservationStatus; }
    public void setConservationStatus(ConservationStatus conservationStatus) { this.conservationStatus = conservationStatus; }

    public String getHabitat() { return habitat; }
    public void setHabitat(String habitat) { this.habitat = habitat; }

    public String getThreatLevel() { return threatLevel; }
    public void setThreatLevel(String threatLevel) { this.threatLevel = threatLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
