package com.wildlifetracker.controllers;

import com.wildlifetracker.models.EcosystemStage;
import com.wildlifetracker.repos.EcosystemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// controller for the ecosystem timelapse data
// this one is simpler than the others - it only needs a single GET endpoint
// we dont need create/update/delete here because the stages are fixed (seeded at startup)
// the frontend uses this data to power the visualisation section
@RestController
@RequestMapping("/api/ecosystem")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class EcosystemController {

    // here we inject the repository directly without a service layer
    // this is acceptable when the logic is very simple (just fetching and returning data)
    // for more complex apps youd normally always use a service in between
    private final EcosystemRepository repo;

    public EcosystemController(EcosystemRepository repo) {
        this.repo = repo;
    }

    // GET /api/ecosystem/stages - returns all 8 ecosystem stages sorted by stageNumber
    // the custom repository method ensures they come back in the right order (1 to 8)
    // spring converts the list to JSON automaticly because of @RestController
    @GetMapping("/stages")
    public List<EcosystemStage> getStages() {
        return repo.findAllByOrderByStageNumberAsc();
    }
}
