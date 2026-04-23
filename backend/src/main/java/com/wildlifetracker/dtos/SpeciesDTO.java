package com.wildlifetracker.dtos;

// DTO stands for Data Transfer Object
// a DTO is a simpler version of a model that we use to control exactly what data gets sent to the frontend
// for example the Species model has an enum for conservationStatus but the DTO can expose it as a plain String
// this means we can shape the JSON response without changing the actual database model
// in this project the DTOs arent fully wired up yet but they show the intended architecture
public class SpeciesDTO {
    public Long id;
    public String commonName;
    public String scientificName;
    public String conservationStatus; // String here instead of enum so its easier to send as JSON
    public String habitat;
    public String threatLevel;
    public String description;
}
