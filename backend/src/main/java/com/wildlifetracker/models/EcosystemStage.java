package com.wildlifetracker.models;

import jakarta.persistence.*;

// EcosystemStage represents one frame/step in the timelapse visualisation
// there are 8 stages total going from 1990 to 2025 showing ecosystem degredation
// each stage has a year, title, description and species count to show on the frontend
@Entity
@Table(name = "ecosystem_stages")
public class EcosystemStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // the order number of this stage (1 through 8)
    // used to sort them corectly when the frontend fetches them
    private Integer stageNumber;

    // the year this stage represents e.g. "1990", "2025"
    // stored as a String because we dont do any date calculations with it, just display it
    // we had to name the column "eco_year" because "year" is a reserved word in some databases
    @Column(name = "eco_year")
    private String year;

    // short title shown on the visualisation e.g. "Healthy Ecosystem"
    private String title;

    // longer description explaining what is happening at this stage
    private String description;

    // how many species remain at this stage e.g. "150+ species" or "0 species"
    // stored as String because its displayed as text not used for calculation
    private String speciesCount;

    // the health status used to colour the indicator dot on the frontend
    // values are: HEALTHY, WARNING, DANGER, CRITICAL, DEAD
    private String status;

    // empty constructor required by hibernate/JPA
    public EcosystemStage() {}

    // full constructor for creating stages in DatabaseInit
    public EcosystemStage(Long id, Integer stageNumber, String year, String title,
                          String description, String speciesCount, String status) {
        this.id = id;
        this.stageNumber = stageNumber;
        this.year = year;
        this.title = title;
        this.description = description;
        this.speciesCount = speciesCount;
        this.status = status;
    }

    // standard getters and setters for each field
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getStageNumber() { return stageNumber; }
    public void setStageNumber(Integer stageNumber) { this.stageNumber = stageNumber; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSpeciesCount() { return speciesCount; }
    public void setSpeciesCount(String speciesCount) { this.speciesCount = speciesCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
