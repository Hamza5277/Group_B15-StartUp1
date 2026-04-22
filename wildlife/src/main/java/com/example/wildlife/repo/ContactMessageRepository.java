package com.example.wildlife.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wildlife.model.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    boolean existsByTicketId(String ticketId);
}