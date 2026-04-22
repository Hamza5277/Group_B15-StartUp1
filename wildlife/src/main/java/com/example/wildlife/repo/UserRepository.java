package com.example.wildlife.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wildlife.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}