package com.wildlifetracker.services;

import com.wildlifetracker.models.ThreatReport;
import com.wildlifetracker.repos.ThreatRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// service layer for threat reports - same pattern as SightingService
// handles get, create, update and delete operations for threat reports
@Service
public class ThreatService {

    private final ThreatRepository repo;

    // spring injects the repository through the constructor
    public ThreatService(ThreatRepository repo) {
        this.repo = repo;
    }

    // returns all threat reports in the database
    public List<ThreatReport> getAll() {
        return repo.findAll();
    }

    // find one threat report by its id
    public Optional<ThreatReport> getById(Long id) {
        return repo.findById(id);
    }

    // save a newly submitted threat report
    public ThreatReport create(ThreatReport t) {
        return repo.save(t);
    }

    // update an existing threat report
    // we look it up first and only update if it actually exists
    // .map() on Optional lets us do something with the value if it's present
    // otherwise it returns Optional.empty() which the controller interprets as 404
    public Optional<ThreatReport> update(Long id, ThreatReport updated) {
        return repo.findById(id).map(existing -> {
            existing.setThreatType(updated.getThreatType());
            existing.setLocation(updated.getLocation());
            existing.setSeverity(updated.getSeverity());
            existing.setDescription(updated.getDescription());
            existing.setReportedBy(updated.getReportedBy());
            return repo.save(existing); // persist the changes to the database
        });
    }

    // delete a threat report, returns false if the id doesnt exist in the database
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
