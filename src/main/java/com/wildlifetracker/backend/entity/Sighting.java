package com.wildlifetracker.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "sightings")
public class Sighting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String species;

    @Column(nullable=false)
    private String location;

    @Column(length = 1500)
    private String notes;

    private String photoUrl;

    @Column(nullable=false)
    private Instant createdAt = Instant.now();

    public Sighting() {}

    public Long getId() { return id; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}