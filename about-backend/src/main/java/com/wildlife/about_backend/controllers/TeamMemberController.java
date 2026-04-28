package com.wildlife.about_backend.controllers;

import com.wildlife.about_backend.models.TeamMember;
import com.wildlife.about_backend.repos.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "*")
public class TeamMemberController {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @GetMapping
    public List<TeamMember> getAllMembers() {
        return teamMemberRepository.findAll();
    }

    @PostMapping
    public TeamMember addMember(@RequestBody TeamMember member) {
        return teamMemberRepository.save(member);
    }

    @PutMapping("/{id}")
    public TeamMember updateMember(@PathVariable Long id, @RequestBody TeamMember member) {
        member.setId(id);
        return teamMemberRepository.save(member);
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
        teamMemberRepository.deleteById(id);
    }
}
