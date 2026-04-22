package com.wildlifetracker.models;

import jakarta.persistence.*;

// ThreatReport model - represents a threat to wildlife submitted by a community member
// e.g. habitat destruction, pollution, poaching etc
// maps to the "threat_reports" table in the database
@Entity
@Table(name = "threat_reports")
public class ThreatReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-incremented primary key

    // the type of threat e.g. "HABITAT_LOSS", "POLLUTION", "HUMAN_ACTIVITY"
    // we use a String rather than enum here to keep it flexible for user input
    private String threatType;

    // location where the threat was observed
    private String location;

    // how serious the threat is - LOW, MODERATE, HIGH, CRITICAL
    // again just a String so the user can type it in or pick from a dropdown
    private String severity;

    // more detail about what exactly is happening
    private String description;

    // who reported this threat
    private String reportedBy;

    // no-args constructor needed by JPA
    public ThreatReport() {}

    // full constructor used in DatabaseInit for seeding sample data
    public ThreatReport(Long id, String threatType, String location, String severity,
                        String description, String reportedBy) {
        this.id = id;
        this.threatType = threatType;
        this.location = location;
        this.severity = severity;
        this.description = description;
        this.reportedBy = reportedBy;
    }

    // getters and setters for all fields
    // the service class uses the setters when updating an existing threat report
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getThreatType() { return threatType; }
    public void setThreatType(String threatType) { this.threatType = threatType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getReportedBy() { return reportedBy; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }
}
