package com.wildlifetracker.dtos;

// DTO for ThreatReport
// again this is a plain representation of the data we want to expose via the API
// all fields are public Strings / Long for simplicity
// in a more production ready version youd use private fields with getters
public class ThreatDTO {
    public Long id;
    public String threatType;   // e.g. HABITAT_LOSS, POLLUTION
    public String location;
    public String severity;     // LOW, MODERATE, HIGH, CRITICAL
    public String description;
    public String reportedBy;
}
