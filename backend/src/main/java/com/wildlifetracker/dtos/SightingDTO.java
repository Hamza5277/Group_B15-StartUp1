package com.wildlifetracker.dtos;

import java.time.LocalDate;

// DTO for Sighting - mirrors the fields from the Sighting model
// having a seperate DTO means we could in future add or remove fields from the API response
// without touching the database model, keeping the two concerns seperate
public class SightingDTO {
    public Long id;
    public String speciesName;
    public String location;
    public LocalDate date;       // date of the sighting
    public String description;
    public String reportedBy;
    public String healthStatus;  // optional field - might be empty if user didnt fill it in
}
