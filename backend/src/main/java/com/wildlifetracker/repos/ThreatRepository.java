package com.wildlifetracker.repos;

import com.wildlifetracker.models.ThreatReport;
import org.springframework.data.jpa.repository.JpaRepository;

// repository for ThreatReport
// by extending JpaRepository we get all the database methods without writing any SQL ourselves
// spring data jpa figures out the queries based on method names and the entity structure
public interface ThreatRepository extends JpaRepository<ThreatReport, Long> {
    // no custom methods needed here either
}
