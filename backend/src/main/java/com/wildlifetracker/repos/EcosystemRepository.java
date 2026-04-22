package com.wildlifetracker.repos;

import com.wildlifetracker.models.EcosystemStage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// repository for EcosystemStage
// this one has a custom query method unlike the others
public interface EcosystemRepository extends JpaRepository<EcosystemStage, Long> {

    // spring data jpa can auto-generate queries just from the method name
    // "findAllByOrderByStageNumberAsc" tells spring to:
    // - find ALL ecosystem stages
    // - order them by the stageNumber column in ASCending order (1, 2, 3... 8)
    // we need this so the timelapse always shows stages in the right chronologcal order
    // without it the order might be random depending on how the database returns them
    List<EcosystemStage> findAllByOrderByStageNumberAsc();
}
